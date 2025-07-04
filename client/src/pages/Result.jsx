import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    setLoading(true)

    const generatedImage = await generateImage(input)
    if (generatedImage) {
      setImageLoaded(true)
      setImage(generatedImage)
    }

    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col min-h-[90vh] justify-center items-center'
    >
      <div>
        <div className='relative'>
          <img
            src={image}
            alt="Generated Result"
            className='max-w-sm rounded shadow-lg'
          />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[10s] ${loading ? 'w-full' : 'w-0'}`}></span>
        </div>
        {loading && <p className='text-center mt-2 text-sm text-blue-600'>Generating image...</p>}
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 py-3 placeholder:text-white'
          />
          <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10'>
          <p
            onClick={() => {
              setImageLoaded(false)
              setInput('')
            }}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          <a
            href={image}
            download='generated-image.png'
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  )
}

export default Result

