import React, {useState} from 'react';
import './components/FontAwesome/index'
import './App.css';
import Slider from './components/Slider/Slider';
import Sidebar from './components/Sidebar/Sidebar';
import Image from './components/Choose-image/Image';

function App() {

  const DEFAULT_OPTIONS = [
    {
      icon: 'sun',
      property: 'brightness',
      title: "Brightness",
      value: 100,
      range: {
        // MIN AND MAX
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      icon: 'yin-yang',
      property: 'Contrast',
      title: "Contrast",
      value: 100,
      range: {
        // MIN AND MAX
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      icon: 'balance-scale',
      property: 'grayscale',
      title: "Grayscale",
      value: 0,
      range: {
        // MIN AND MAX
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      icon: 'filter',
      property: 'sepia',
      title: 'Sepia',
      value: 0,
      range: {
        // MIN AND MAX
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      icon: 'fill-drip',
      property: 'hue-rotate',
      title: 'Hue-Rotate',
      value: 0,
      range: {
        // MIN AND MAX
        min: 0,
        max: 360
      },
      unit: 'deg'
    },
    {
      icon: 'compact-disc',
      property: 'blur',
      title: 'Blur',
      value: 0,
      range: {
        // MIN AND MAX
        min: 0,
        max: 20
      },
      unit: 'px'
    },
  ]

  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selected_option_index, set_selected_option_index] = useState(0);
  const selected_option = options[selected_option_index];

  function image(){
    const image = document.querySelector('.image');
  }



  function slider_position_change ({target}){
    setOptions(previousOption =>{
      return previousOption.map((option, index) =>{
        if(index !== selected_option_index) return option
        return {...option, value: target.value}
      })
    })
  }
  
  function image_style(){
    const styles = options.map(option =>{
      return `${option.property}(${option.value}${option.unit})`
    })

    return {filter: styles.join(' ')}
  }


  let LINK;

  function input_link(){
    document.getElementById('input_btn').addEventListener('click', ()=>{
      document.querySelector('.input-image-container').style.display = 'flex';
    })
  }

  function submit_input(){
    let LINK = document.getElementById('link-input').value;
    document.querySelector('.image').setAttribute('src', LINK);
    
    document.querySelector('.input-image-container').style.display = 'none';
    document.getElementById('link-input').value = '';
  }

  function close_input(){
    document.querySelector('.input-image-container').style.display = 'none';
  }

  function download(url, fullName) {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.style.display = 'none'
    anchor.setAttribute('download', fullName)
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  function screenshot(imgNode, format = 'png', quality = 0.97) {
    const canvas = document.createElement('canvas')
    canvas.width = imgNode.width
    canvas.height = imgNode.height
  
    const context = canvas.getContext('2d')
    context.filter = getComputedStyle(imgNode).filter
  
    imgNode.setAttribute('crossOrigin', 'anonymous')
  
    context.drawImage(imgNode, 0, 0, canvas.width, canvas.height)
    const url = canvas.toDataURL(`image/${format}`, quality)
  
    return {
      url,
      then: (cb) => {
        cb(url)
      },
      download: (name = 'image') => {
        download(url, `${name}.${format}`)
      }
    }
  }

  function download_img(){
    let img = document.querySelector('.image')
    screenshot(img).download()
  }

  return (
    <div className="main-container">

      <div className="input-image-container">
        <div className="input-container">
          <button onClick = {close_input} className="close-input" type="submit">X</button>
          <h3>Enter link</h3>
          <input id="link-input" type="text"/>
          <button onClick = {submit_input} className="submit-input" type="submit">Submit</button>
        </div>
      </div>

      <div className="sidebar">
          <div className="buttons-container">
            {options.map((option,index) =>{
              return(<Sidebar
              key={index}
              icon={option.icon}
              title = {option.title}
              active = {index === selected_option_index}
              handleClick = {()=>{set_selected_option_index(index)}}
              />)
            })}
          </div>
          <div className="Slider">
            <Slider 
              min = {selected_option.range.min}
              max = {selected_option.range.max}
              value = {selected_option.value}
              handleChange = {slider_position_change}
            />
          </div>
          <div className="save-upload-btns">
            <button id="input_btn" onMouseUp={input_link}>Input Image Link</button>
            <button id="download_image_btn" onMouseUp={download_img}>Download Image</button>
          </div>
      </div>
      {/* <div className="image" style={image_style()}> */}
        <img className="image" crossOrigin="anonymous" style={image_style()} src={`${LINK}`}/>
        <canvas id="image-canvas"></canvas>
      {/* </div> */}
    </div>
  )
}

export default App;
