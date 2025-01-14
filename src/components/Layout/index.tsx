import GameContainer from "../../containers/GameContainer";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return <div className={styles['layout']}>
    <GameContainer/>
  </div>
}

export default Layout;