import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import router from "../router";
import { useParams } from "react-router-dom";
import PublicQuestionView from "../components/PublicQuestionView";

export default function SurveyPublicView() {


    const answers = {};
    const { slug } = useParams();
    const [survey, setSurvey] = useState({ questions: []});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        axiosClient.get(`/survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(false)
                setSurvey(data.data);
            }).catch(() => {
                setLoading(false);
            })
    }, []);

    function answerChanged(question, value){
        answers[question.id] = value;
    }

    function onSubmit(ev){
        ev.preventDefault();

        
    }   

    return (
        <div>
            {
                loading &&
                <div className="flex justify-center">Loading...</div>
            }

            {!loading && (
                <form onSubmit={ ev => onSubmit(ev)} className="container mx-auto p-4">
                    <div className="grid grid-cols-6">
                        <div className="col-span-5">
                            <h1 className="text-3x1 mb-3">{survey.title}</h1>
                            <p className="text-gray-500 text-sm mb-3"> Expire Date: {survey.expire_date}</p>
                            <p className="text-gray-500 text-sm mb-3"> {survey.description}</p>
                        </div>
                    </div>

                    <div>
                        {
                            survey.questions?.map((question, index) => (
                                <PublicQuestionView key={question.id} question={question} index={index} answerChanged={ val => answerChanged(question, val)}/>
                            ))
                        }
                    </div>

                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                    </button>
                </form>
            )}
        </div>
    );
}