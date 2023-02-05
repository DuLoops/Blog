import { Box, Button } from '@chakra-ui/react';
import {useEffect, useState} from 'react'
import { ChevronUpIcon } from '@chakra-ui/icons';
const ScrollToTopBtn = () => {
  const [showButton, SetShowButton] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=> {
      if(window.pageYOffset > 300) {
        SetShowButton(true);
      } else {
        SetShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (<Box position={'fixed'} bottom='10px' right='10px'>
    {showButton && <Button onClick={scrollToTop} p='0'><ChevronUpIcon boxSize='30px'/></Button>}
  </Box>)

}

export default ScrollToTopBtn;