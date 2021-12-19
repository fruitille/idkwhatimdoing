import { Button } from 'antd'
import React from 'react'
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { isIOS, isIOS13, isMacOs, isSafari } from 'react-device-detect';

function Downloader() {

    const handleSaveClick = () => {
        const element = document.getElementById('checkresult')
        if (!element) return;
        if ( isIOS || isIOS13 || isSafari || isMacOs) {
            alert('alternative Downloader for iOS & Safari')
            html2canvas(element).then(function(canvas) {
                let a = document.createElement('a');
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")
                a.download = `character.png`;
                a.click();
            })
        } else {
            domtoimage.toJpeg(element, { quality: 1 })
            .then(function (dataUrl) {
               var link = document.createElement('a');
               link.download = `character.png`;
               link.href = dataUrl;
               link.click();
           });
        }
    }

    return (
        <Button style={{ height: "40px", width: "130px", fontSize: "1.2rem", fontWeight: 600, margin: 5}} type="primary" danger onClick={handleSaveClick}>Download</Button>
    )
}

export default Downloader
