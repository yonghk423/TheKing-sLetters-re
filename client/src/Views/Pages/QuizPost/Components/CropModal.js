import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';
import uploadIcon from '../Assets/upload-1.svg';

const ModalBackgroundBlur = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ModalButton = styled.button`
  border: none;
  height: inherit;
  font-size: 1rem;
  font-weight: 500;
  box-sizing: border-box;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
  letter-spacing: 2px;
  font-family: 'EBSHMJESaeronRA';
  border-radius: 10px;
  padding: 0 1rem;
  height: 150px;
  :hover {
    cursor: pointer;
    color: #fafafa;
    border: 1px solid #303030;
    background-color: #303030;
    border-radius: 10px;
  }
`;

const ModalView = styled.div`
  position: relative;
  border-radius: 10px;
  margin: 0 1.5rem;
  padding: 5rem 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .image_cropper .ReactCrop__crop-selection {
    max-width: 100%;
    max-height: 100%;
  }
  > .image_cropper div .ReactCrop__image {
    max-width: 80vw;
    max-height: 80vh;
  }

  > .image_cropper_buttons {
    position: absolute;
    bottom: 1.3em;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > .confirm_button {
      border: 1px solid rgba(77, 109, 254, 0.9);
      border-radius: 6px;
      padding: 8px 18px;
      font-size: 1.2em;
      line-height: 1.2em;
      color: #fafafa;
      margin-right: 2rem;
      background-color: rgba(77, 109, 254, 0.9);
      transition: all 0.4s ease;
      letter-spacing: 2px;
    }
    > .confirm_button:hover {
      cursor: pointer;
      background-color: #0066ff;
      border: 1px solid #0066ff;
    }
    > .cancel_button {
      border: 1px solid #303030;
      border-radius: 6px;
      padding: 8px 18px;
      font-size: 1.2em;
      line-height: 1.2em;
      color: #303030;
      background-color: transparent;
      letter-spacing: 2px;
      transition: all 0.4s ease;
    }
    > .cancel_button:hover {
      cursor: pointer;
      color: #fafafa;
      background-color: #303030;
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageUpload = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .upload_label_icon {
    max-width: 60%;
    > .upload_icon {
      border-radius: 10px;
      border: 1px dashed rgba(0, 0, 0, 0.5);
      background-size: cover;
    }
    :hover {
      cursor: pointer;
    }
  }
  > .upload_button_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    > .upload_button_label {
      font-family: 'EBSHMJESaeronRA';
      position: relative;
      border-radius: 5px;
      margin-right: 2rem;
      padding: 8px 18px;
      color: #fafafa;
      letter-spacing: 1px;
      font-size: 1rem;
      height: 1.5rem;
      line-height: 1.5rem;
      background-color: rgba(77, 109, 254, 0.9);
      border: 1px solid rgba(77, 109, 254, 0.9);
      transition: all 0.4s ease;
    }
    > .upload_button_label:hover {
      cursor: pointer;
      background-color: #0066ff;
      border: 1px solid #0066ff;
    }

    > .upload_button_cancel {
      font-family: 'EBSHMJESaeronRA';
      position: relative;
      border-radius: 5px;
      padding: 8px 18px;
      color: #303030;
      letter-spacing: 1px;
      font-size: 1rem;
      height: 1.5rem;
      line-height: 1.5rem;
      background-color: transparent;
      outline: 1px solid #222222b0;
      transition: all 0.4s ease;
    }
    > .upload_button_cancel:hover {
      cursor: pointer;
      background-color: #222222b0;
      color: #fafafa;
    }
  }

  #upload_hidden {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const dataURLtoFile = (dataurl, fileName) => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

const CropModal = ({ handler, config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const modalOpenHandler = () => {
    setIsUploaded(false);
    setImageURL(null);
    setIsOpen(!isOpen);
  };

  const ImageCropper = ({ src }) => {
    const [crop, setCrop] = useState(config);
    const cropCompleteHandler = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };
      img.src = src;
      URL.revokeObjectURL(src);
      const croppedFile = await getCroppedImage(img, crop);
      const croppedUrl = URL.createObjectURL(croppedFile);
      modalOpenHandler();
      handler(croppedFile, croppedUrl);
    };
    return (
      <>
        <ReactCrop
          className="image_cropper"
          src={src}
          crop={crop}
          onChange={(crop, percentCrop) => setCrop(percentCrop)}
          keepSelection="true"
          // onImageLoaded={(image) => console.log(image)}
          // onComplete={(crop, percentCrop) => onCompleteHandler(crop, percentCrop)}
        />
        <div className="image_cropper_buttons">
          <button className="confirm_button" onClick={cropCompleteHandler}>
            잘라내기
          </button>
          <button className="cancel_button" onClick={modalOpenHandler}>
            닫기
          </button>
        </div>
      </>
    );
  };

  /*
  crop (required)
  이미지 크롭의 기본 설정

  예시)
  crop: {
    aspect: 16 / 9;
  }
  crop: {
    aspect: 16/9,
    width: 50,
  }
  crop: {
    unit: '%',
    width: 50,
    height: 50,
  }

  crop의 단위는 unit: '%'를 사용하는 것을 추천
  브러우저 창에서 실제로 띄워지는 이미지는 축소되어 나타날 수 있기 때문에
  브라우저 창에서 띄워지는 이미지를 드래그해서 크롭의 범위를 지정하면
  크롭 지정한 범위의 픽셀이 실제 크기의 픽셀과 달라질 수 있음

  onChange(crop, percentCrop) (required)
  사용자가 이미지를 클릭하거나 드래그하면 작업이 진행되면 콜백
  onComplete 이벤트 리스너와 비슷함

  컴포넌트에 저장되는 crop 객체는 다음과 같은 정보가 저장됨
  aspect: 1 // 크롭 이미지 비율
  height: 349 // 세로축 길이
  unit: "px" // 단위
  width: 349 // 가로축 길이
  x: 137 // 가로축 시작점
  y: 0 // 세로축 시작점

  onComplete(crop, percentCrop) (optional)
  사용자가 이미지를 클릭하거나 드래그하면 작업이 완료되면 콜백

  onImageLoaded(image) (optional)
  이미지 로드에 성공하면 콜백

  onImageError(event) (optional)
  이미지 로드에 실패하면 콜백
  */

  const getCroppedImage = async (image, cropped) => {
    // 파라미터
    // image: 원본 이미지 객체
    // cropped: react-image-crop에서 지정한 크롭할 x축 시작점, x축 길이, y축 시작점, y축 길이 정보를 담고있는 객체
    const cWidth = Math.ceil(image.width * (cropped.width / 100));
    const cHeight = Math.ceil(image.height * (cropped.height / 100));
    const cXstart = Math.ceil(image.width * (cropped.x / 100));
    const cYstart = Math.ceil(image.height * (cropped.y / 100));

    // console.log('cWidth ', cWidth);
    // console.log('cHeight ', cHeight);
    // console.log('cXstart ', cXstart);
    // console.log('cYstart ', cYstart);

    // canvas 엘리먼트 생성(이미지를 크롭하기 위해 사용할 일종의 그림판 엘리먼트)
    const canvas = document.createElement('canvas');
    // canvas 엘리먼트의 크기를 원본 이미지와 같이 설정
    // console.log('image width', image.width);
    // console.log('image height', image.height);
    canvas.width = cWidth;
    canvas.height = cHeight;

    // canvas 엘리먼트의 렌더링 컨텍스트를 불러옴(일종의 그림판)
    const ctx = canvas.getContext('2d');

    // 렌더링 컨텍스트가 존재하지 않으면 canvas를 지원하지 않는 구형 브라우저
    if (!canvas.getContext) {
      console.log('구형 브라우저는 지원하지 않는 기능입니다');
    }
    /*
    drawImage 메소드의 파라메터
    참고: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

    image  : [필수] 원본 image 또는 canvas 객체
    sx : [필수] 원본 이미지에서 가져올 x 좌표 시작점
    sy : [필수] 원본 이미지에서 가져올 y 좌표 시작점
    sWidth : [옵션] 원본 이미지에서 가져올 가로 길이
    sHeight :  [옵션] 원본 이미지에서 가져올 세로 길이
    dx : [옵션] 이미지 그리기를 시작할 x 좌표
    dy : [옵션] 이미지 그리기를 시작할 y 좌표
    dWidth : [옵션] 이미지 그리기를 시작할 가로 길이
    dHeight : [옵션] 이미지 그리기를 시작할 세로 길이
    */

    // canvas 객체의 렌더링 컨텍스트를 편집함
    ctx.drawImage(
      // 아래 좌표대로 원본 이미지를 크롭해서 가져옴
      image, // 파라메터 image
      cXstart, // 파라메터 sx
      cYstart, // 파라메터 sy
      cWidth, // 파라메터 sWidth
      cHeight, // 파라메터 sHeight
      // 크롭한 이미지를 새로 만든 캔버스에 붙여넣음
      0, // 파라메터 dx
      0, // 파라메터 dy
      cWidth, // 파라메터 dWidth
      cHeight // 파라메터 dHeight
    );

    // canvas 이미지를 base64 형식으로 인코딩한 뒤 다시 File 객체로 변환해서 반환
    return dataURLtoFile(canvas.toDataURL('image/png'), 'uploaded.png');
  };

  const imageInputHandler = (e) => {
    const file = e.target.files[0];
    setImageURL(URL.createObjectURL(file));
    setIsUploaded(true);
  };

  return (
    <>
      <ModalButton onClick={modalOpenHandler}>
        이미지를 업로드하려면
        <br />
        여기를 클릭하세요
      </ModalButton>
      {isOpen ? (
        <ModalBackgroundBlur>
          <ModalView>
            {isUploaded ? (
              <ImageCropper src={imageURL}></ImageCropper>
            ) : (
              <ImageUpload>
                <label className="upload_label_icon" htmlFor="upload_hidden">
                  <img
                    className="upload_icon"
                    src={uploadIcon}
                    alt="업로드 이미지 아이콘"
                  ></img>
                </label>
                <div className="upload_button_container">
                  <label
                    className="upload_button_label"
                    htmlFor="upload_hidden"
                  >
                    이미지 선택하기
                    <input
                      type="file"
                      id="upload_hidden"
                      style={{ display: 'none' }}
                      onChange={imageInputHandler}
                    ></input>
                  </label>
                  <p
                    className="upload_button_cancel"
                    onClick={modalOpenHandler}
                  >
                    닫기
                  </p>
                </div>
              </ImageUpload>
            )}
          </ModalView>
        </ModalBackgroundBlur>
      ) : null}
    </>
  );
};

export default CropModal;
