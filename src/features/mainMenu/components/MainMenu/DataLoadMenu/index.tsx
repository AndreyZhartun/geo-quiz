import { Card, Spinner } from "@blueprintjs/core";
import { DataLoadConfig, DataLoadMenuProps, SupportedDataConfigs } from './types';
import TechList from "../TechList";
import { useEffect } from "react";
import useDispatch from "../../../../../hooks/useDispatch";
import { generateStartingQuestions, loadDataAction } from "../../../../../reducer/actions";
import useDataFetch from "../../../hooks/useDataFetch";

/**
 * Меню загрузки данных для квиза
 */
const DataLoadMenu: React.FC<DataLoadMenuProps> = ({
  config,
}) => {

  const dispatch = useDispatch();

  const {
    data,
    loading,
    error,
  } = useDataFetch(config);

  useEffect(() => {
    if (!data.length) {
      return;
    }

    dispatch(loadDataAction(data));
    dispatch(generateStartingQuestions());
  }, [dispatch, data]);
  
  const {
    title,
    techs,
    linkHref,
    linkLabel,
  } = dataConfigs[config];

  if (error) { 
    return <p>Ошибка: {error}</p>
  }

  return <Card compact className="d-flex justify-content-between">
    <div>
      <h3 className="mb-1">{title}</h3>
      <div className="d-flex mb-3">
        <TechList techs={techs}/>
        <a href={linkHref} target="_blank" rel="noopener" className="ml-1">
          {linkLabel}
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

const dataConfigs: Record<SupportedDataConfigs, DataLoadConfig> = {
  [SupportedDataConfigs.Geography]: {
    title: "Квиз на знание географии",
    techs: ["GraphQL"],
    linkHref: "https://github.com/trevorblades/countries",
    linkLabel: "github.com/trevorblades/countries",
  }
}

export default DataLoadMenu;