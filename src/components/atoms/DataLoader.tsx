import { Button, Input, Modal } from 'antd'
import React, { useContext, useState} from 'react'
import Swal from 'sweetalert2';
import { AnotherContext } from '../../contexts';

const { TextArea } = Input;

function DataLoader() {

    const { inven, setInven } = useContext(AnotherContext)
    const dataText = inven.join(",")

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [UserData, setUserData] = useState("")

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const dataCopy = () => {
        navigator.clipboard.writeText(`${dataText}`)
        .then(()=>{
            Swal.fire({
            text: "Data Copied to Clipboard",
            width: 280,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
                popup: "alert",
            },
            });
        })
    }

    const dataLoad = () => {
        const newData = UserData.split(",").map(Number)
        window.localStorage.setItem("a_inv", UserData)
        setInven(newData)
        Swal.fire({
            text: "Data Load Success",
            width: 280,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
                popup: "alert",
            },
        }).then(() => {
            window.location.reload()
        })
    }

    return (
        <>
            <Button shape='round' style={{ height: "35px", width: "110px", fontSize: "0.9rem", fontWeight: 600, margin: 5}} 
            type="dashed"
            onClick={showModal}>DataLoader</Button>
            <Modal title="Data Copy &#38; Load" visible={isModalVisible} onCancel={handleCancel}
            okButtonProps={{ style: { display: 'none' } }}>
                <h2>Your Data</h2>
                <TextArea placeholder={dataText} disabled
                autoSize={{ minRows: 4, maxRows: 4 }}/>
                <br/><br/>
                <TextArea placeholder="new data here" value={UserData}
                onChange={(e) => setUserData(e.currentTarget.value)}
                autoSize={{ minRows: 4, maxRows: 4 }}/>
                <br/><br/>
                <Button style={{margin: 5}} type="primary" onClick={dataCopy}>COPY</Button>
                <Button style={{margin: 5}} type="primary" onClick={dataLoad} danger>LOAD</Button>
            </Modal>
        </>
    )
}

export default DataLoader
