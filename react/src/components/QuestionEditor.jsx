
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";


export default function QuestionEditor({ index = 0, question, addQuestion, deleteQuestion, questionChange }) {


    const { questionTypes } = useStateContext();

    const [model, setModel] = useState({
        ...question
    });

    //notifying the parent component that the local question has been changed.
    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function showHaveOptions(type) {

        type = type || model.type;

        return ['select', 'radio', 'checkbox'].includes(type);
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value
        };

        if (!showHaveOptions(model.type) && showHaveOptions(ev.target.value)) {
            newModel.data = {
                options: [
                    { uuid: uuidv4(), text: '' }
                ]
            }
        } else if(showHaveOptions(model.type) && !showHaveOptions(ev.target.value)){
            newModel.data = {};
        }
        setModel(newModel);
    }

    function addOption(){

        model.data.options.push(
            {uuid: uuidv4(), text: ''}
        )

        setModel({ ...model})
    }

    function deleteOption(op){
        model.data.options = model.data.options.filter(option => option.uuid != op.uuid);
        setModel({ ...model});
    }
    return (<div>
        <div className="flex justify-between mb-3">
            <h4>
                {index + 1} . {model.question}
            </h4>

            <div className="flex items-center">
                <button type="button" onClick={() => addQuestion(index + 1)} className="flex items-center text-cs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                    <PlusIcon className="w-4" />
                    Add
                </button>

                <button type="button" onClick={() => deleteQuestion(question)} className="flex items-center text-cs py-1 px-3 mr-2 rounded-sm text-red hover:border-red-600 font-remibold">
                    <TrashIcon className="w-4" />
                    Remove
                </button>
            </div>
        </div>

        <div className="flex gap-3 justify-between mb-3">
            <div className="flex-1">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                    Question
                </label>
                <input type="text"
                    name="question"
                    id="question"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={model.question}
                    onChange={(ev) =>
                        setModel({ ...model, question: ev.target.value })
                    }
                />
            </div>
        </div>

        <div>
            <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 W-40">
                Question Type
            </label>
            <select
                onChange={onTypeChange}
                name="questionType"
                id="questionType"
                value={model.type}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                {
                    questionTypes.map((type) => (
                        <option value={type} key={type}>
                            {upperCaseFirst(type)}
                        </option>
                    ))
                }
            </select>
        </div>

        <div>
            <label htmlFor="questionDescription" className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <textarea
                name="questionDescription"
                id="questionDescription"
                value={model.description || ""}
                onChange={(ev) => setModel({ ...model, description: ev.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
            </textarea>
        </div>

        <div>
            {showHaveOptions() &&
                <div>
                    <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                        Options
                        <button type="button" onClick={ addOption } className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                            Add
                        </button>
                    </h4>

                    {model.data.options.length === 0 &&
                        <div className="text-xs text-gray-600 text-center py-3">
                            You don't have any options defined.
                        </div>
                    }
                    {model.data.options.length > 0 &&
                        <div>
                            {
                                model.data.options.map((op, ind) => (
                                    <div className="flex items-center mb-1" key={ op.uuid }>
                                        <span className="w-65 text-sm">{ind + 1}.</span>
                                        <input type="text" value={op.text}  onInput={ ev=> {op.text = ev.target.value; setModel({ ...model })} } className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"/>
                                        <button type="button" onClick={ ev => deleteOption(op) } className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                                            <TrashIcon className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </div>

    </div>

    );
}