interface DataObject {
    [key: string]: string | number | DataObject[];
}

interface Result {
    [key: string]: DataObject[];
}

interface StackEntry {
    context: DataObject[];
    type: 'array' | 'object' | 'headers';
    headers?: string[];
    key?: string;
}

export function HCSVtoJSON(csv: string): Result {
    const result: Result = {};
    const lines = csv.trim().split('\n');
    const stack: StackEntry[] = [];
    let currentContext: DataObject[] | undefined = undefined;

    const stripQuotes = (value: string): string => {
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.slice(1, -1);
        }
        return value;
    };

    const parseCSVLine = (line: string): string[] => {
        const values: string[] = [];
        let current = '';
        let inQuotes = false;
        let i = 0;

        while (i < line.length) {
            const char = line[i];

            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Handle escaped quotes ("")
                    current += '"';
                    i += 2;
                    continue;
                }
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                // Found delimiter outside of quotes
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
            i++;
        }

        // Add the last value
        values.push(current.trim());
        return values;
    };

    lines.map((l: string) => l.replace(/^\t+/, '')).forEach(line => {
        if (line.trim() === '') {
            return;
        }

        const level = parseInt(line.charAt(0), 10);
        const values = parseCSVLine(line.slice(2)).map(v => stripQuotes(v));
        while (stack.length >= level) {
            stack.pop();
        }
        if (level === 1) {
            const key = values[0];
            result[key] = [];
            stack.push({ context: result[key], type: 'array' });
            currentContext = result[key];
        } else if (level % 2 === 0) {
            const headers = values.map(v => v.trim());
            stack.push({ context: currentContext!, type: 'headers', headers });
        } else {
            const data: DataObject = {};
            const { headers } = stack[stack.length - 1];
            headers!.forEach((header, i) => {
                // Use simple left-to-right mapping for most cases
                // Only use complex logic for nested hierarchical structures (level > 3)
                const useComplexLogic = level > 3 && headers!.length !== values.length;
                
                let value;
                if (useComplexLogic) {
                    // Original complex logic for nested hierarchical structures
                    value = values[headers!.length == values.length ? i : i - 1]; // remove first
                    data[header] = isNaN(Number(value)) || value === '' ? value : Number(value);
                    if (i == 0) {
                        data[header] = headers!.length == values.length ? data[header] : header;
                    }
                } else {
                    // Simple left-to-right mapping for regular cases
                    value = values[i];
                    if (value !== undefined) {
                        data[header] = isNaN(Number(value)) || value === '' ? value : Number(value);
                    } else {
                        data[header] = ''; // Default to empty string if no value
                    }
                }
            });
            const parentContext = stack[stack.length - 2];
            if (parentContext.type === 'array') {
                parentContext.context.push(data);
            } else {
                const lastItem = parentContext.context[parentContext.context.length - 1] as DataObject;
                const keyValue = headers!.length > 1 ? String(data[headers![0]]) : undefined;
                if (keyValue) {
                    delete data[headers![0]];
                    if (!lastItem[keyValue]) {
                        lastItem[keyValue] = [];
                    }
                    (lastItem[keyValue] as DataObject[]).push(data);
                } else {
                    parentContext.context.push(data);
                }
            }
            stack.push({ context: [data], type: 'object' });
        }

        currentContext = stack[stack.length - 1].context;
    });

    return result;
}

