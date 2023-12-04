import React from "react";

export default function SurveyListItem({ survey }) {

  return (
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
  );
}