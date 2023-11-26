import {
  addImage,
  removeImage
} from './store/actions'

import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


function App() {
  const images = useSelector(state => state.images);
  const [open , setOpen] = useState(false);
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

  const toggleIsOpen = () => {
    setOpen(!open);
  }

  const handleOpen = (image) => {
    toggleIsOpen();
    setImage(image);
  }




  return (
    <div className="w-full relative  justify-star items-center min-h-screen flex flex-col gap-2 overflow-hidden">
      <div
       className={`w-full h-screen  fixed z-50 bg-slate-900/5 backdrop-blur-md ${open ? 'block' : 'hidden'}`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-96 h-96 bg-white rounded-md flex flex-col justify-center items-center gap-4">
            <h1 className='text-2xl font-bold'>Image Gallery</h1>
            <motion.div
            className="w-full h-full flex justify-center items-center">
              <img
                src={image}
                onDragStart={disapleSelect}
                className='w-full h-full object-cover rounded-xl'
              />
            </motion.div>
            <button
              onClick={() => setOpen(false)}
              className='bg-sky-600 text-white px-4 py-2 rounded-lg'
            >
              Close
            </button>
          </div>
          </div>
      </div>
      <h1
        className='text-4xl text-center font-bold'
      >
        Redux Image Gallery
      </h1>
      <hr
        className='w-96 relative   border border-slate-400/10'
      />
      <div className=' absolute z-20 rounded-xl bg-slate-900/10 justify-between items-center bottom-8 w-96 p-4   flex'>
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
          className='bg-sky-600 text-white px-4 py-2 rounded-lg'
        >
          Upload
        </button>

      </div>
      <div className=" w-full px-4 md:px-0 md:w-[800px] grid grid-cols-2 md:grid-cols-3  mt-20 justify-center items-center relative flex-col-reverse  gap-3    ">
        <AnimatePresence

        >
          {
            images.map((image, index) => {
              return (
                <motion.div
                  onClick={() => handleOpen(image)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  key={index}
                  layout
                  className={`w-full col-span-1 relative cursor-pointer top-3 aspect-square rounded-xl border border-slate-600/10 flex justify-start items-center overflow-hidden z-${index}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeImageHandler(image)}
                    className='absolute top-2 right-2 w-8 h-8 flex justify-center items-center rounded-full bg-gray-900/10 text-white hover:text-sky-500 cursor-pointer transition-all ease-in-out duration-300'
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
