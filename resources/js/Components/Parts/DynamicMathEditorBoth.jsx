import React, { useEffect } from "react";
import MathEditor from "./MathEditor";
import { Plus, Trash } from "lucide-react";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";

export default function DynamicMathEditorBoth({
    qFrom,
    name,
    defaultCount = 1,
    defaultValues = [], // [{question:"", answer:""}]
}) {
    // Initialize default editors on mount
    useEffect(() => {
        if (!qFrom.data[name] || qFrom.data[name].length === 0) {
            const initial =
                defaultValues.length > 0
                    ? defaultValues
                    : Array(defaultCount).fill({ question: "", answer: "" });
            qFrom.setData(name, initial);
        }
    }, []);

    const items = qFrom.data[name] || [];

    // Add new question+answer pair
    const handleAdd = () => {
        const newItems = [...items, { question: "", answer: "" }];
        qFrom.setData(name, newItems);
    };

    // Delete pair
    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        qFrom.setData(name, newItems);
    };

    // Update question or answer
    const handleChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        qFrom.setData(name, newItems);
    };

    return (
        <div className="space-y-4">
            {items.map((item, idx) => (
                <div key={idx} className="border border-dashed border-gray-400 rounded-box p-3 space-y-4 relative">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-600">প্রশ্ন* {ENGLISH_TO_BANGLA(idx + 1)}</h4>
                        <button
                            type="button"
                            onClick={() => handleDelete(idx)}
                            className="btn btn-sm btn-error btn-circle"
                        >
                            <Trash size={14} />
                        </button>
                    </div>

                    {/* Question editor */}
                    <MathEditor
                        value={item.question}
                        onChange={(val) => handleChange(idx, "question", val)}
                    />

                    {/* Answer editor */}
                    <div className="mt-2">
                        <h5 className="text-sm font-bold text-gray-600">উত্তর</h5>
                        <MathEditor
                            value={item.answer}
                            onChange={(val) => handleChange(idx, "answer", val)}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="btn btn-sm btn-primary mt-2 flex items-center gap-1"
            >
                <Plus size={14} /> Add Question
            </button>
        </div>
    );
}
