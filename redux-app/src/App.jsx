import {
  addImage,
  removeImage
} from './store/actions'

import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


function App() {
  const images = useSelector(state => state.images);

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', image);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        const { imagePath } = data;
        const getNewPath = imagePath.replace('../redux-app/public/', '')
        dispatch(addImage(getNewPath));

      })

  }

  const removeImageHandler = (image) => {
    dispatch(removeImage(image))
  }

  const disapleSelect = (e) => {
    e.preventDefault();
  }


  return (
    <div className="w-full relative  justify-star items-center min-h-screen flex flex-col gap-2 overflow-hidden">
      <h1
        className='text-4xl text-center font-bold'
      >
        Redux Image Uploader
      </h1>
      <hr
        className='w-96 relative   border border-slate-400/10'
      />
      <div className=' absolute justify-between items-center bottom-8 w-96 rounded-md   flex'>
        <div className="w-8 h-8 flex relative rounded-full border border-slate-300 justify-center items-center ">
          <label htmlFor="file">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </label>
          <input
            id='file'
            onChange={handleImage}
            className='absolute w-full h-full opacity-0 cursor-pointer'
            type="file"
          />

        </div>
        <button
          onClick={handleUpload}
          className='bg-sky-600 text-white px-4 py-2 rounded-md'
        >
          Upload
        </button>

      </div>
      <div className="w-96 mt-20 justify-center items-center relative flex-col-reverse  gap-3 flex   ">
        <AnimatePresence

        >
          {
            images.map((image, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  key={index}
                  layout
                  drag={true}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.5}
                  dragMomentum={true}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                  
                  className={`w-full cursor-pointer top-3 absolute h-96 rounded-md border border-slate-600/10 flex justify-start items-center overflow-hidden z-${index}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeImageHandler(image)}
                    className='absolute top-2 right-2 w-8 h-8 flex justify-center items-center rounded-full bg-gray-100/40 text-white hover:text-sky-500 cursor-pointer transition-all ease-in-out duration-300'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                  <img
                    onDragStart={disapleSelect}
                    src={image}
                    className='w-full h-full object-cover rounded-md'
                  />
                </motion.div>
              )
            })
          }
        </AnimatePresence>
      </div>
    </div>

  )
}

export default App
