import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { Button, Grid, TextField, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import FileUpload from '../../Components/UI/Form/FileUpload'
import { useSendShowcaseMutation } from '../../Store/services/sendShowcase'

const SendShowcase = () => {
  const [sendShowcase] = useSendShowcaseMutation()
  const navigate = useNavigate()
  const [newBouquet, setNewBouquet] = useState({
    name: '',
    description: '',
    image: '',
  })
  const queryParams = new URLSearchParams(window.location.search)
  const params = queryParams.get('params')
  console.log(JSON.parse(params as string))

  //Тут будет массив который будет получен с предыдущей страницы
  const [bouquetDescription, setBouquetDescription] = useState([
    {
      id_item: '1',
      name: 'Роза',
      price: 1000,
      count: 1,
    },
    {
      id_item: '2',
      name: 'Фиалка',
      price: 120,
      count: 12,
    },
    {
      id_item: '3',
      name: 'Гвоздика',
      price: 201,
      count: 10,
    },
    {
      id_item: '4',
      name: 'Ромашка',
      price: 301,
      count: 7,
    },
  ])

  // useEffect(() => {
  //   setBouquetDescription(JSON.parse(params as string))
  // }, [params])

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBouquet((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const submitSendHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (newBouquet.image) {
      formData.append('image', newBouquet.image)
    }
    formData.append('description', newBouquet.description)
    formData.append('name', newBouquet.name)
    formData.append('items', JSON.stringify(bouquetDescription))
    await sendShowcase(formData)
    await navigate('/available_bouquets')
  }

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    if (e.target.files) {
      const file = e.target.files[0]
      setNewBouquet((prevState) => ({
        ...prevState,
        [name]: file,
      }))
    }
  }

  const cancellation = () => {
    navigate('/florist_page')
  }

  return (
    <>
      <Container>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          sx={{ mb: 4 }}
          onClick={cancellation}
        >
          Отмена
        </Button>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h4" sx={{ mb: 4 }} textAlign="left">
              Описание букета
            </Typography>
            <Grid container direction="column" spacing={2}>
              {bouquetDescription &&
                bouquetDescription.map((bouquet) => (
                  <Grid item xs key={bouquet.id_item}>
                    <ul>
                      <li>Цветок: {bouquet.name}</li>
                      <li>Цена: {bouquet.price}</li>
                      <li>Количество: {bouquet.count}</li>
                    </ul>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Переместить букет на витрину
            </Typography>
            <form autoComplete="off" onSubmit={submitSendHandler}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Название букета"
                    value={newBouquet.name}
                    onChange={handleSubmit}
                    name="name"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    variant="outlined"
                    label="Описание букета"
                    value={newBouquet.description}
                    onChange={handleSubmit}
                    name="description"
                  />
                </Grid>
                <Grid item xs>
                  <FileUpload
                    label="Фото"
                    name="image"
                    onChange={fileChangeHandler}
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    disabled={newBouquet.name.length > 0 ? false : true}
                  >
                    Переместить
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default SendShowcase
