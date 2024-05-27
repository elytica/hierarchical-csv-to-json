import { HCSVtoJSON } from '../src/index';
import { describe, expect, test } from '@jest/globals';

describe('HCSVtoJSON function', () => {
    test('parses hierarchical CSV to JSON correctly', () => {
        const csv = `1,Test
2,heading1,heading2
3,data1,2
1,Test2`;

        const expectedOutput = {
            "Test": [{"heading1": "data1", "heading2": 2}],
            "Test2": []
        };

        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });


    test('parses hierarchical file to JSON with tabs', () => {
        const csv = `1,Schedule File
	2,Version,Originator
	3,v1.01,"Some.Scheduler"
`;

        const expectedOutput = {
            "Schedule File": [{"Version": "v1.01", "Originator": "Some.Scheduler"}]
        };

        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });

    test('handles empty input', () => {
        const csv = '';
        const expectedOutput = {};
        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });

    test('handles input without any data rows', () => {
        const csv = `1,Test
1,Test2`;
        const expectedOutput = {
            "Test": [],
            "Test2": []
        };
        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });

    test('handles nested hierarchical CSV to JSON correctly', () => {
        const csv = `1,Text Fields
2,Name,Type
3,"Backfill",Text
3,"Block",Text
3,"Block Number",Text
3,"BM Name",Combo
4,List,Label,Color,Pattern,Shape
5,"West 1",12533824,0,0
5,"West 2",4243391,0,0
5,"WestCent",4210879,0,0
5,"Cent 1",8405183,0,0
5,"Cent 2",10895551,0,0
5,"East 1",12533951,0,0
5,"East 2",12533933,0,0
5,"1",12533919,0,0`;

        const expectedOutput = {
            "Text Fields": [
                { "Name": "Backfill", "Type": "Text" },
                { "Name": "Block", "Type": "Text" },
                { "Name": "Block Number", "Type": "Text" },
                { "Name": "BM Name", "Type": "Combo", "List": [
                    { "Label": "West 1", "Color": 12533824, "Pattern": 0, "Shape": 0 },
                    { "Label": "West 2", "Color": 4243391, "Pattern": 0, "Shape": 0 },
                    { "Label": "WestCent", "Color": 4210879, "Pattern": 0, "Shape": 0 },
                    { "Label": "Cent 1", "Color": 8405183, "Pattern": 0, "Shape": 0 },
                    { "Label": "Cent 2", "Color": 10895551, "Pattern": 0, "Shape": 0 },
                    { "Label": "East 1", "Color": 12533951, "Pattern": 0, "Shape": 0 },
                    { "Label": "East 2", "Color": 12533933, "Pattern": 0, "Shape": 0 },
                    { "Label": 1, "Color": 12533919, "Pattern": 0, "Shape": 0 }
                ]}
            ]
        };

        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });

    test('handles input without any data rows', () => {
        const csv = `1,Text Fields
1,Another Field`;
        const expectedOutput = {
            "Text Fields": [],
            "Another Field": []
        };
        expect(HCSVtoJSON(csv)).toEqual(expectedOutput);
    });
});

