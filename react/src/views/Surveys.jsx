import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import router from "../router";

export default function Surveys() {

    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const onDeleteClick = (id) => {

        if (window.confirm('Are you sure you want to delete this survey?')) {
            axiosClient.delete(`/survey/${id}`)
                .then(() => {
                    getSurveys();
                });

        }
    }


    useEffect(() => {
        getSurveys();
    }, []);


    const getSurveys = (url) => {

        setLoading(true);

        url = url || '/survey';

        axiosClient.get(url)
            .then(({ data }) => {
                setSurveys(data.data);
                setMeta(data.meta);
                setLoading(false);
            })
    }

    const onPageClick = (link) => {
        getSurveys(link.url);
    }


    return (
        <PageComponent title="Surveys" buttons={(<TButton color="green" to="/surveys/create"> <PlusCircleIcon className="h-6 w-6 mr-2 " /> Create new</TButton>)}>

            {loading &&
                <div className="text-center font-lg">
                    Loading...
                </div>
            }

            {!loading &&
                <div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {surveys.map((survey) => (
                            <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
                        ))}
                    </div>
                    <PaginationLinks meta={meta} onPageClick={onPageClick} />
                </div>
            }
        </PageComponent>
    );
}