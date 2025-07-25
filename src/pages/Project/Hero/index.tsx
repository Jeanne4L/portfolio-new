import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import ScrollIndicator from "../../../components/ScrollIndicator"
import H1 from "../../../components/text/H1"
import Span from "../../../components/text/Span"
import Tag from "../../../components/Tag"
import Button from "../../../components/Button"
import type { ProjectType } from "../../../types/projects"
import { ButtonsContainer, Content, Description, HeroContainer, ImgContainer, TagsContainer, Title } from "./styles"

type HeroProps = {
  project: ProjectType
  imgUrl: string
}

const Hero = ({ project, imgUrl }: HeroProps) => {
  const [isIndicatorVisible, setIsIndicatorVisible] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY < 1) {
        setIsIndicatorVisible(true)
      } else {
        setIsIndicatorVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const { name, tagline, tags, texts, website, repo } = project
  
  return (
    <HeroContainer>
      <Content>
        <Title>
          <H1>{name}</H1>
          <Span bold>{tagline}</Span>
        </Title>

        <TagsContainer>
          {tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </TagsContainer>
        
        <Description>
          {texts}
        </Description>

        <ButtonsContainer>
          {website && (
            <Button label='Voir le site' variant='primary' link={website} isExternLink />
          )}
          {repo && (
            <Button label='Voir le code' variant={website ? 'secondary' : 'primary'} link={repo} isExternLink />
          )}
        </ButtonsContainer>
      </Content>

      <ImgContainer>
        <img src={imgUrl} alt={`${name} mobile`} />
      </ImgContainer>
      

      {isIndicatorVisible && <ScrollIndicator onClick={() => navigate('#gallery')} />}
    </HeroContainer>
  )
}

export default Hero