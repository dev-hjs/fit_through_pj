import React from 'react';
import styled from 'styled-components';
import gitBtn from '../../images/git.png';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContent>
        <br />
        <FooterTitle>-- Get to know us ! --</FooterTitle>
        <LinkContainer>
          <LinkWrapper>
            <Name>손형정</Name>
            <LinkIcon href="https://github.com/hyungjungson" target="_blank" rel="noopener noreferrer">
              <GitBtn src={gitBtn} alt="깃 이미지" />
            </LinkIcon>
          </LinkWrapper>
          <LinkWrapper>
            <Name>서경모</Name>
            <LinkIcon href="https://github.com/CTDKSKM" target="_blank" rel="noopener noreferrer">
              <GitBtn src={gitBtn} alt="깃 이미지" />
            </LinkIcon>
          </LinkWrapper>
          <LinkWrapper>
            <Name>이수진</Name>
            <LinkIcon href="https://github.com/leesoojinn" target="_blank" rel="noopener noreferrer">
              <GitBtn src={gitBtn} alt="깃 이미지" />
            </LinkIcon>
          </LinkWrapper>
          <LinkWrapper>
            <Name>최수아</Name>
            <LinkIcon href="https://github.com/choisua98" target="_blank" rel="noopener noreferrer">
              <GitBtn src={gitBtn} alt="깃 이미지" />
            </LinkIcon>
          </LinkWrapper>
          <LinkWrapper>
            <Name>이예지</Name>
            <LinkIcon href="https://github.com/nna-na" target="_blank" rel="noopener noreferrer">
              <GitBtn src={gitBtn} alt="깃 이미지" />
            </LinkIcon>
          </LinkWrapper>
        </LinkContainer>
        <FooterText>@ 2023 4조 취업시켜조</FooterText>
      </FooterContent>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  position: relative;
  bottom: 0;
  margin-top: 50px;
  background: rgb(247, 249, 250);
  padding-top: 5px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
`;

const FooterTitle = styled.p`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: rgb(110, 110, 110);
  margin-top: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  color: #343434;
`;

const Name = styled.p`
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  width: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const LinkIcon = styled.a`
  max-width: 31px;
`;

const GitBtn = styled.img`
  width: 31px;
`;

const FooterText = styled.span`
  color: rgb(110, 110, 110);
  font-size: 12px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export default Footer;
