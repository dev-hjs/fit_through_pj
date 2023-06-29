import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <>
      <F.FooterWrap>
        <F.Footer>
          <p>fit through (맛뚜루) : 취업시켜조 팀이 만드는 건강 정보 공유 플랫폼</p>
          <ul></ul>
        </F.Footer>
      </F.FooterWrap>
    </>
  );
};

export default Footer;

const F = {
  FooterWrap: styled.footer`
    width: 100%;
    background: rgb(53, 197, 240);
  `,
  Footer: styled.div`
    max-width: 1156px;
  `
};
