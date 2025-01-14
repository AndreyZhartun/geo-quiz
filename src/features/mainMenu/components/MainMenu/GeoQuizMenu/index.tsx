import { Card, Spinner } from "@blueprintjs/core";
import TechList from "../TechList";
import { gql, useQuery } from "@apollo/client";
import Country from "../../../../quiz/models/Country";
import { useEffect } from "react";
import { generateStartingQuestions, loadDataAction } from "../../../../../reducer/actions";
import useDispatch from "../../../../../hooks/useDispatch";

const usedTechs = [
  "GraphQL",
  "Apollo",
]

const GET_COUNTRIES = gql`
  query {
  countries {
    code
    name
    capital
    emoji
  }
  }
`;

type CountriesQueryResult = {
  countries: Country[];
}

/**
 * Меню выбора квиза по географии
 */
const GeoQuizMenu: React.FC = () => {

  const dispatch = useDispatch();
  
  const {
    data,
    loading,
    error,
  } = useQuery<CountriesQueryResult>(GET_COUNTRIES);

  useEffect(() => {
    if (!data?.countries.length) {
      return;
    }

    dispatch(loadDataAction(data.countries));
    dispatch(generateStartingQuestions());
  }, [dispatch, data]);

  if (error) { 
    return <p>Ошибка: {error.message}</p>
  }

  // if (!data) {
  //   return <p>
  //     Нет данных
  //   </p>
  // }

  return <Card compact className="d-flex justify-content-between">
    <div>
      <h3 className="mb-1">Квиз на знание географии</h3>
      <div className="d-flex mb-3">
        <TechList techs={usedTechs}/>
        <a href="https://github.com/trevorblades/countries" target="_blank" rel="noopener" className="ml-1">
          github.com/trevorblades/countries
        </a>
      </div>
      {!error && (
        <div className="text-secondary">
          {loading ? "Загрузка..." : "Выбран по умолчанию"}
        </div>
      )}
    </div>
    {loading && <Spinner size={32}/>}
  </Card>
}

export default GeoQuizMenu;
