import React, { useEffect, useRef, useState } from "react";
import Trix from "trix";
import TurndownService from 'turndown';

const turndownService = new TurndownService()
turndownService.addRule('strikethrough', {
  filter: ['del', 's', 'strike'],
  replacement: function (content) {
    return '~' + content + '~'
  }
});

turndownService.addRule('strikethrough', {
  filter: ['pre'],
  replacement: function (content) {
    return '```' + content + '```'
  }
})

const Wysiwyg = () => {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("trix-change", event => {
        setValue(event.target.innerHTML);
      })
    }
  }, [])

  useEffect(() => {
    console.log(value);
    console.log(turndownService.turndown(value))
  }, [value])

  return (
    <div>
        <input
            type="hidden"
            id="trix"
        />
        <trix-editor input="trix" ref={inputRef} />
    </div>
  );
}

export default Wysiwyg;