import { HCSVtoJSON } from '../src/index';
import { describe, expect, test } from '@jest/globals';

describe('Complex Task Data CSV Parsing', () => {
    test('parses task data with many columns (without commas in quoted strings)', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Start,Finish,Priority,Progress,Status
3,1,Planning_Task,Task_Description,2025-08-01,2025-08-02,100,50.5,Active
3,2,Another_Task,,2025-08-03,2025-08-04,85,0,Pending`;

        const result = HCSVtoJSON(csv);
        
        expect(result).toHaveProperty('Tasks');
        expect(Array.isArray(result.Tasks)).toBe(true);
        expect(result.Tasks).toHaveLength(2);
        
        const task1 = result.Tasks[0];
        expect(task1.ID).toBe(1);
        expect(task1.Name).toBe("Planning_Task");
        expect(task1.Description).toBe("Task_Description");
        expect(task1.Start).toBe("2025-08-01");
        expect(task1.Finish).toBe("2025-08-02");
        expect(task1.Priority).toBe(100);
        expect(task1.Progress).toBe(50.5);
        expect(task1.Status).toBe("Active");
        
        const task2 = result.Tasks[1];
        expect(task2.ID).toBe(2);
        expect(task2.Name).toBe("Another_Task");
        expect(task2.Description).toBe("");
        expect(task2.Status).toBe("Pending");
    });

    test('parses task data with proper number conversion', () => {
        const csv = `1,Tasks
2,ID,Name,Priority,Progress
3,1,"Test Task",100,50.5
3,2,"Another Task",85,0`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(2);
        expect(result.Tasks[0].ID).toBe(1);
        expect(result.Tasks[0].Name).toBe("Test Task");
        expect(result.Tasks[0].Priority).toBe(100);
        expect(result.Tasks[0].Progress).toBe(50.5);
        
        expect(result.Tasks[1].ID).toBe(2);
        expect(result.Tasks[1].Name).toBe("Another Task");
        expect(result.Tasks[1].Priority).toBe(85);
        expect(result.Tasks[1].Progress).toBe(0);
    });

    test('handles empty string values properly', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Status
3,1,"Test Task","","Active"
3,2,"Task 2","Description here",""`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(2);
        expect(result.Tasks[0].Description).toBe("");
        expect(result.Tasks[0].Status).toBe("Active");
        expect(result.Tasks[1].Description).toBe("Description here");
        expect(result.Tasks[1].Status).toBe("");
    });

    test('handles very large numbers in scientific notation', () => {
        const csv = `1,Tasks
2,ID,LargeValue,SmallValue
3,1,3.2E+21,1.02`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks[0].LargeValue).toBe(3.2e+21);
        expect(result.Tasks[0].SmallValue).toBe(1.02);
    });

    test('handles simple quoted strings (without commas)', () => {
        const csv = `1,Tasks
2,ID,Name,Path
3,1,"Simple Task","C:\\\\Users\\\\Test"
3,2,"Another Task","Path/With/Slashes"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks[0].Name).toBe("Simple Task");
        expect(result.Tasks[0].Path).toBe("C:\\\\Users\\\\Test");
        expect(result.Tasks[1].Name).toBe("Another Task");
        expect(result.Tasks[1].Path).toBe("Path/With/Slashes");
    });

    test('handles tasks with minimal data', () => {
        const csv = `1,Tasks
2,ID,Name
3,1,"Minimal Task"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        expect(result.Tasks[0].ID).toBe(1);
        expect(result.Tasks[0].Name).toBe("Minimal Task");
    });

    test('handles multiple task sections', () => {
        const csv = `1,Active Tasks
2,ID,Name,Status
3,1,"Task 1","Active"
1,Completed Tasks
2,ID,Name,Status
3,2,"Task 2","Completed"`;

        const result = HCSVtoJSON(csv);
        
        expect(result).toHaveProperty('Active Tasks');
        expect(result).toHaveProperty('Completed Tasks');
        expect(result['Active Tasks']).toHaveLength(1);
        expect(result['Completed Tasks']).toHaveLength(1);
        expect(result['Active Tasks'][0].Status).toBe("Active");
        expect(result['Completed Tasks'][0].Status).toBe("Completed");
    });

    test('handles date and time formats', () => {
        const csv = `1,Tasks
2,ID,StartDate,EndDate,Created
3,1,2025-08-01 00:00,2025-08-01 00:00,"0001/01/01 00:00:00"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks[0].StartDate).toBe("2025-08-01 00:00");
        expect(result.Tasks[0].EndDate).toBe("2025-08-01 00:00");
        expect(result.Tasks[0].Created).toBe("0001/01/01 00:00:00");
    });

    test('handles boolean-like values as numbers or strings', () => {
        const csv = `1,Tasks  
2,ID,IsActive,IsSummary,Status
3,1,1,0,"YES"
3,2,0,1,"NO"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks[0].IsActive).toBe(1);
        expect(result.Tasks[0].IsSummary).toBe(0);
        expect(result.Tasks[0].Status).toBe("YES");
        expect(result.Tasks[1].IsActive).toBe(0);
        expect(result.Tasks[1].IsSummary).toBe(1);
        expect(result.Tasks[1].Status).toBe("NO");
    });

    test('now correctly handles commas in quoted strings', () => {
        // ✅ FIXED: This previously failed but now works correctly
        const csv = `1,Tasks
2,ID,Name,Description
3,1,"Task with, comma","Description"`;

        const result = HCSVtoJSON(csv);
        
        // The parser now correctly handles commas within quoted strings
        expect(result.Tasks).toHaveLength(1);
        expect(result.Tasks[0].ID).toBe(1); // Now correctly gets 1
        expect(result.Tasks[0].Name).toBe("Task with, comma"); // Comma preserved
        expect(result.Tasks[0].Description).toBe("Description");
    });

    test('handles very long data rows', () => {
        const csv = `1,Tasks
2,ID,Col1,Col2,Col3,Col4,Col5,Col6,Col7,Col8,Col9,Col10
3,1,A,B,C,D,E,F,G,H,I,J`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        expect(result.Tasks[0].ID).toBe(1);
        expect(result.Tasks[0].Col1).toBe("A");
        expect(result.Tasks[0].Col10).toBe("J");
    });

    test('handles mixed data types correctly', () => {
        const csv = `1,Tasks
2,ID,Name,Price,IsActive,Notes
3,1,"Product A",19.99,1,""
3,2,"Product B",0,0,"Special notes"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(2);
        expect(result.Tasks[0].ID).toBe(1);
        expect(result.Tasks[0].Name).toBe("Product A");
        expect(result.Tasks[0].Price).toBe(19.99);
        expect(result.Tasks[0].IsActive).toBe(1);
        expect(result.Tasks[0].Notes).toBe("");
        
        expect(result.Tasks[1].ID).toBe(2);
        expect(result.Tasks[1].Name).toBe("Product B");
        expect(result.Tasks[1].Price).toBe(0);
        expect(result.Tasks[1].IsActive).toBe(0);
        expect(result.Tasks[1].Notes).toBe("Special notes");
    });
});