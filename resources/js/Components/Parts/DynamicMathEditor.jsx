import React, { useEffect } from "react";
import MathEditor from "./MathEditor";
import { Plus, Trash } from "lucide-react";

export default function DynamicMathEditor({
    qFrom,
    name,
    defaultCount = 1,
    defaultValues = [],
    type = "normal", // "normal" or "hard"
}) {
    useEffect(() => {
        if (!qFrom.data[name] || qFrom.data[name].length === 0) {
            const initial =
                defaultValues && defaultValues.length > 0
                    ? defaultValues.map((v) =>
                          typeof v === "string"
                              ? { value: v, isRight: false }
                              : v
                      )
                    : Array(defaultCount).fill({ value: "", isRight: false });
            qFrom.setData(name, initial);
        }
    }, []);

    const editors = qFrom.data[name] || [];

    // মোড অনুযায়ী বিপরীত mode এর radio deselect করো
    useEffect(() => {
        const label = qFrom.data.question_label;

        if (label === "hard" && qFrom.data?.mcqQuestion) {
            const resetNormal = qFrom.data.mcqQuestion.map((item) => ({
                ...item,
                isRight: false,
            }));
            qFrom.setData("mcqQuestion", resetNormal);
        }

        if (label === "normal" && qFrom.data?.mcqQuestionhard) {
            const resetHard = qFrom.data.mcqQuestionhard.map((item) => ({
                ...item,
                isRight: false,
            }));
            qFrom.setData("mcqQuestionhard", resetHard);
        }
    }, [qFrom.data.question_label]);

    const handleAdd = () => {
        const newEditors = [...editors, { value: "", isRight: false }];
        qFrom.setData(name, newEditors);
    };

    const handleDelete = (index) => {
        const newEditors = editors.filter((_, i) => i !== index);
        qFrom.setData(name, newEditors);
    };

    const handleChange = (index, value) => {
        const newEditors = [...editors];
        newEditors[index].value = value;
        qFrom.setData(name, newEditors);
    };

    const handleSelectRight = (index) => {
        const newEditors = editors.map((item, i) => ({
            ...item,
            isRight: i === index,
        }));
        qFrom.setData(name, newEditors);
    };

    // এখন শুধুমাত্র question_label অনুযায়ী radio দেখাও
    const showRadio =
        (qFrom.data.question_label === "normal" && type === "normal") ||
        (qFrom.data.question_label === "hard" && type === "hard");

    return (
        <div className="space-y-2">
            {editors.map((item, idx) => (
                <div key={idx} className="flex gap-2 relative mt-4 items-start">
                    {showRadio && (
                        <input
                            type="radio"
                            name={`isRight_${type}`}
                            checked={item.isRight}
                            onChange={() => handleSelectRight(idx)}
                            className="radio radio-primary mt-2"
                        />
                    )}

                    <div className="flex-1">
                        <MathEditor
                            value={item.value}
                            onChange={(val) => handleChange(idx, val)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => handleDelete(idx)}
                        className="btn btn-sm btn-error btn-circle absolute top-0 right-0"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAdd}
                className="btn btn-sm btn-primary mt-2"
            >
                <Plus size={14} /> Add More
            </button>
        </div>
    );
}
