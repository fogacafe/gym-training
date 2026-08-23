import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { Divider } from '../../components/Divider'
import { List } from '../../components/List'
import { Title } from '../../components/Title'
import { useTrainings } from '../../hooks/useTrainings'
import { Container, ImgContent, TitleContainer } from './styles'

export function Home() {
  const navigate = useNavigate()
  const { trainings, removeTraining } = useTrainings()

  const trainingItems = trainings.map(({ id, title, description }) => ({
    id,
    title,
    descriptionOne: description,
  }))

  return (
    <Container>
      <ImgContent>
        <img src={logo} alt="Gym Training" />
      </ImgContent>

      <TitleContainer>
        <Title>
          Meus<p>treinos</p>
        </Title>
        <Button size="md" onClick={() => navigate('/create')}>
          Adicionar
        </Button>
      </TitleContainer>

      <Divider />

      <List
        items={trainingItems}
        titleEmptyList="Você não possui treinos cadastrados"
        subtitleEmptyList="Crie treinos para acompanhar sua evolução"
        onClick={(id) => navigate(`/divisions/${id}`)}
        onDelete={removeTraining}
      />
    </Container>
  )
}
