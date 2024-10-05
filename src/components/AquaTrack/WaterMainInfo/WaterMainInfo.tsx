import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import styles from './WaterMainInfo.module.scss';
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import Button from "../../Shared/Button/Button";
import { useState } from "react";
import ReactModal from "../../ReactModal/ReactModal";
import WaterModal from "../WaterModal/WaterModal";
import { Bottle } from "@/assets/images";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles['wrapper']}>
      <WaterDailyNorma />
      <img className={styles.bottle} alt="bottle" src={Bottle} />
      <WaterProgressBar />
      <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <WaterModal onSubmitSuccess={() => setIsModalOpen(false)} />
      </ReactModal>
      <Button onClick={() => setIsModalOpen(true)} className={styles['add-water-button']} variant="secondary" icon="Plus">
        Add Water
      </Button>
    </div>
  );
};

export default WaterMainInfo;
