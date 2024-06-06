import React from 'react';
import styled from 'styled-components';
import '../footer/footer.css'

const FooterContainer = styled.footer`
  background-color: #2d939c;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer  >
      <FooterContent>
        
        <div><p>Copyright NEKI 2024. Todos os direitos reservados. Desenvolvido por curso desenvolvedor FullStack Serratec/Senac.</p></div>
      
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
