import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void,
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("") 
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")

  function resetForm() {
    setImageUrl("")
    setTitle("") 
    setSubtitle("")
    setDescription("")
  }

  return (
    <form className="p-4 ">
      <InputField name="Url" value={imageUrl} setter={setImageUrl}/>
      <InputField name="Title" value={title} setter={setTitle}/>
      <InputField name="Subtitle" value={subtitle} setter={setSubtitle}/>
      <InputField name="Description" value={description}  setter={setDescription}/>
      <div className="text-center">
      <Button data-testid="submit-button" onClick={() => {
        onSubmit({
          imageUrl,
          title,
          subtitle,
          description
        })
        resetForm()
      }}
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
