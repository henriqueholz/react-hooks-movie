import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void,
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("") 
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <form className="p-4 ">
      <InputField name="Url" setter={setUrl}/>
      <InputField name="Title" setter={setTitle}/>
      <InputField name="Subtitle" setter={setSubtitle}/>
      <InputField name="Description" setter={setDescription}/>
      <div className="text-center">
      <Button onClick={() => {
        onSubmit({
          imageUrl: url,
          title,
          subtitle,
          description
        })}}
      >
        Submit
      </Button>
      <Button onClick={() => {onCancel()}}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
