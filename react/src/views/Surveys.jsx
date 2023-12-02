import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys(){

    const { surveys } = useStateContext();

    return (
        <PageComponent title="Surveys">
            Surveys Content
        </PageComponent>
    );
}
