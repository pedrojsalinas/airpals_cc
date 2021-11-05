import './AddressSearchPage.css';
import Autocomplete from "react-google-autocomplete";
import Modal from 'react-modal';
import React from 'react';
import getPostalCode from "../../functions/getPostalCode";
import verifyPostalCode from "../../functions/verifyPostalCode";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function AddressSearchPage() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalSubtitle, setModalSubtitle] = React.useState('');
  const [modalText, setModalText] = React.useState('');
  const [modalTextFooter, setModalTextFooter] = React.useState('');
  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
  const mapOptions = {
    types: ['address']
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const setTextModal = (place) => {
    const postalCode = getPostalCode(place);
    const validCode = verifyPostalCode(postalCode);
    setModalTitle(validCode ? 'Address updated' : 'Out of Delivery Area');
    setModalSubtitle(validCode ? 'New address added to your account' : '"Wherever I go, there I am."');
    setModalText(validCode ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint rerum fuga amet, suscipit repellat laborum tempore velit eveniet impedit nulla.' : 'Sadly, this quote is not true for us. In other words, we are not operating in your area (yet), but things change everyday.');
    setModalTextFooter(validCode ? 'Nisi ut aliquip ex ea commodo consequat.' : 'Sign up to our newsletter to get notified.');
    openModal();
  }


  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" >
      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section className="text-center">
          <h3 className="font-bold text-2xl">Where are you located?</h3>
          <p className="pt-2">So we know where to drop off the stuff</p>
          <span className="text-gray-600">We won't share your address <br /> with your ex (or whoever).</span>
        </section>
        <section className="mt-10">
          <div className="flex flex-col">

            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
              <Autocomplete
                apiKey={googleMapApiKey}
                placeholder=""
                options={mapOptions}
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onPlaceSelected={(place) => {
                  setTextModal(place);
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-sm z-50">
          <svg onClick={closeModal} className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
        <div className="bg-white">
          <div className="text-center p-5">
            <h2 className="text-2xl font-bold">{modalTitle}</h2>
            <div className="pt-4">
              <span className="">{modalSubtitle}</span>
            </div>
            <div className="pt-2">
              <p className="text-base">{modalText}</p>
            </div>
            <div className="pt-4">
              <span className="">{modalTextFooter}</span>
            </div>

          </div>
          <div className="h-20"></div>
          <div className="text-center">
            <button onClick={closeModal} className="w-60 bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">UNDERSTOOD</button>
          </div>
        </div>
      </Modal>
    </div >
  );
}

export default AddressSearchPage;
