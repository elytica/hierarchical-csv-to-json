import { HCSVtoJSON } from '../src/index';
import { describe, expect, test } from '@jest/globals';

describe('CSV Parser Fix Tests', () => {
    test('handles commas inside quoted strings correctly', () => {
        const csv = `1,Tasks
2,ID,Name,Location
3,1,"Task Name","7784.44720551724,-22979.6931869792"`;

        const result = HCSVtoJSON(csv);
        
        // This should now work correctly with the fixed parser
        expect(result).toHaveProperty('Tasks');
        expect(result.Tasks).toHaveLength(1);
        
        const task = result.Tasks[0];
        expect(task.ID).toBe(1); // Should be numeric 1, not string "ID"
        expect(task.Name).toBe("Task Name");
        expect(task.Location).toBe("7784.44720551724,-22979.6931869792");
    });

    test('handles the exact coordinate format from your dataset', () => {
        const csv = `1,Tasks
2,ID,Name,StartPoint,EndPoint
3,1,"Planning Task","7784.44720551724,-22979.6931869792,-915.49472845187","7784.44720551724,-22979.6931869792,-915.49472845187"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task.Name).toBe("Planning Task");
        expect(task.StartPoint).toBe("7784.44720551724,-22979.6931869792,-915.49472845187");
        expect(task.EndPoint).toBe("7784.44720551724,-22979.6931869792,-915.49472845187");
    });

    test('handles the original problematic task name', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Start
3,"1","Planning \\Import Tool_Graphic Task__0","",2025-08-01 00:00`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task.Name).toBe("Planning \\Import Tool_Graphic Task__0");
        expect(task.Description).toBe("");
        expect(task.Start).toBe("2025-08-01 00:00");
    });

    test('handles quoted headers with spaces', () => {
        const csv = `1,Tasks
2,ID,"Task Name","Area Code","Box Type"
3,1,"Planning Task","NEW","BOX1"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task["Task Name"]).toBe("Planning Task");
        expect(task["Area Code"]).toBe("NEW");
        expect(task["Box Type"]).toBe("BOX1");
    });

    test('handles escaped quotes within quoted strings', () => {
        const csv = `1,Tasks
2,ID,Name,Description
3,1,"Task with ""quotes""","Description with ""embedded quotes"""`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task.Name).toBe('Task with "quotes"');
        expect(task.Description).toBe('Description with "embedded quotes"');
    });

    test('handles empty quoted fields', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Value
3,1,"Task Name","",100`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task.Name).toBe("Task Name");
        expect(task.Description).toBe("");
        expect(task.Value).toBe(100);
    });

    test('handles mixed quoted and unquoted fields', () => {
        const csv = `1,Tasks
2,ID,Name,Value,Status,"Box Type"
3,1,"Task Name",100,Active,"Type A,B"`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        expect(task.ID).toBe(1);
        expect(task.Name).toBe("Task Name");
        expect(task.Value).toBe(100);
        expect(task.Status).toBe("Active");
        expect(task["Box Type"]).toBe("Type A,B");
    });

    test('maintains compatibility with non-problematic CSV', () => {
        const csv = `1,Tasks
2,ID,Name,Status
3,1,TaskName,Active
3,2,AnotherTask,Pending`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(2);
        expect(result.Tasks[0].ID).toBe(1);
        expect(result.Tasks[0].Name).toBe("TaskName");
        expect(result.Tasks[1].ID).toBe(2);
        expect(result.Tasks[1].Name).toBe("AnotherTask");
    });
});
