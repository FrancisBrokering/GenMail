import React from 'react';
import { ReactComponent as BoldText } from '../logos/BoldTextLogo.svg';
import { ReactComponent as ItalicText } from '../logos/ItalicTextLogo.svg';
import { ReactComponent as UnderlineText } from '../logos/UnderlineTextLogo.svg';
import { ReactComponent as BulletList } from '../logos/BulletListLogo.svg';
import { ReactComponent as LinkLogo } from '../logos/LinkLogo.svg';

const GetEditerLogo = (name: string) => {
  if (name === 'BoldText') return <BoldText />
  if (name === 'ItalicText') return <ItalicText />
  if (name === 'UnderlineText') return <UnderlineText />
  if (name === 'BulletList') return <BulletList />
  if (name === 'LinkLogo') return <LinkLogo />
}

export default GetEditerLogo;
