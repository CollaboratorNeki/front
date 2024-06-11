import React from 'react';
import styled from 'styled-components';
import '../footer/footer.css';
import logoSerratec from "../../assets/Logo-Serratec.png";

const FooterContainer = styled.footer`
  background: linear-gradient(to top,#2d939c, #68C7CF) ;
  color: #fff;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 4;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 10px 0;
  }
  `;
  
  const FooterContent = styled.div`
  max-width: 1200px,
  margin: 0 auto,
  text-align: center,
  display: flex,
  align-items: center,
 


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
  @media (max-width: 768px) {
  flex-direction: column;
  text-align: center;
  }
  `;
  
  const Footer = () => {
    return (
      <FooterContainer  >
      <FooterContent>
      
        
        <div><p>Copyright NEKI 2024. Todos os direitos reservados.</p></div>
      
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
