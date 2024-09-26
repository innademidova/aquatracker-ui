import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import bottle from '../../../assets/images/bottle.png';
import styles from './WaterMainInfo.module.scss';
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import Button from "../../Shared/Button/Button";
import { useState } from "react";
import ReactModal from "../../ReactModal/ReactModal";
import WaterModal from "../WaterModal/WaterModal";

const WaterMainInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <div className={styles['wrapper']}>
        <WaterDailyNorma />
        <img className={styles.bottle} alt="bottle" src={bottle} />
        <WaterProgressBar />
        <ReactModal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
            <WaterModal setIsModalOpen={setIsModalOpen} />
        </ReactModal>
        <Button onClick={() => setIsModalOpen(true)} className={styles['add-water-button']} variant="secondary" icon='Plus'>Add Water</Button>
    </div>
}

export default WaterMainInfo; 