import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Quill, { QuillOptionsStatic } from 'quill';
import 'quill/dist/quill.snow.css';
import { isEqual } from '../../../lib/compareObjects';

export type Props = {
  label?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>
  value?: string;
  className?: string;
  options?: QuillOptionsStatic;
};

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const INITIAL_STATE_OPTIONS: QuillOptionsStatic = {
  placeholder: 'Compose an epic...',
  readOnly: false,
  theme: 'snow',
  modules,
};


export const FormTypeHtml = (props: Props) => {
  const { label, value = '', setValue, className, options } = props;

  const divRef = useRef<HTMLDivElement | null>(null)
  const editor = useRef<Quill | null>(null)
  const [optionsState, setOptions] = useState(INITIAL_STATE_OPTIONS)
  const [prevOptions, setPrevOptions] = useState<QuillOptionsStatic>({})

  const onTextChange = () => {
    if (editor.current && setValue) {
      setValue(editor.current.root.innerHTML)
    }
  }

  useEffect(() => {
    if (options && !isEqual(options, prevOptions)) {
      setPrevOptions(options)
    }
  }, [options, setPrevOptions])

  useEffect(() => {
    const newOptions: QuillOptionsStatic = {
      ...INITIAL_STATE_OPTIONS,
      ...prevOptions
    }
    setOptions(newOptions)
  }, [prevOptions, setOptions])

  useEffect(() => {
    if (!divRef.current) return

    const divQuill = document.createElement("div");
    divRef.current.appendChild(divQuill)
    editor.current = new Quill(divQuill, optionsState);
    editor.current.on('text-change', onTextChange)

    return () => {
      if (editor.current) {
        editor.current.off('text-change', onTextChange);
        editor.current = null
      }

      if (divRef.current) {
        divRef.current.innerHTML = '';
      }
    }

  }, [optionsState, divRef.current])

  useEffect(() => {
    if (!editor.current) return
    if (editor.current.root.innerHTML !== value) {
      editor.current.clipboard.dangerouslyPasteHTML(value, 'api')
    }

  }, [optionsState, value, editor.current])


  return (
    <Form.Group className={className}>
      {label ? <Form.Label>{label}</Form.Label> : ''}
      <div ref={divRef} />
    </Form.Group>
  );
};