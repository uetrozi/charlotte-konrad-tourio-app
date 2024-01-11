import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import useSWR from "swr";
import { useState } from "react";

export default function Comments({ locationName, comments, id }) {
  const { mutate } = useSWR(`/api/places/${id}`);

  const [submitted, setSubmit] = useState(false);

  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 5px;
    }
  `;
  async function handleSubmitComment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response) {
        setSubmit(true);
        setTimeout(() => {
          setSubmit(false);
        }, 2000);
      }

      if (!response.ok) {
        throw new Error("Error!");
      }
      event.target.reset();
      mutate();
    } catch (error) {
      console.log("ERROR !!");
    }
    console.log(`Comment added successfully...`);
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton
          type="submit"
          style={{ backgroundColor: submitted ? "lightgreen" : "lightsalmon" }}
        >
          {submitted ? 'Submitted!' : 'Send'}
        </StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, _id) => {
            return (
              <>
                <p key={_id}>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </>
            );
          })}
        </>
      )}
    </Article>
  );
}
