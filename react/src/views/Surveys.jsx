import { useState } from "react";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() {

    const { surveys } = useStateContext();

    const onDeleteClick = () => {
        console.log("i am clicked");
    }

    return (<PageComponent>
        <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey) => (
                    <SurveyListItem survey={survey} key={survey.id} onDeleteClick={ onDeleteClick } />
                ))}
            </div>
        </div>
    </PageComponent>);
}