import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import {
  InfoOutlined,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
} from '@material-ui/icons';
import { bannerColors, contentColors } from './constants';
import { BannerType, BannerContainerProps } from './types';

const bannerIcons = {
  info: InfoOutlined,
  success: CheckCircle,
  warning: Warning,
  critical: ErrorIcon,
};

const BannerContainer = styled.div`
  background-color: ${(props: BannerContainerProps) => props.color};
  width: 100%;
  padding: 16px;
  border-radius: 5px;
  * {
    color: ${(props: BannerContainerProps) => props.contentColor};
  }
`;

const BannerHeader = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

type Props = {
  type: BannerType;
  title: string;
  message?: string;
  children?: React.ReactNode;
};

const Banner = ({ type, title, message, children }: Props) => {
  const BannerIcon = bannerIcons[type];
  const bannerColor = bannerColors[type];
  const contentColor = contentColors[type];
  return (
    <BannerContainer color={bannerColor} contentColor={contentColor}>
      <BannerHeader>
        <IconWrapper>
          <BannerIcon />
        </IconWrapper>
        <Typography variant="h6">{title}</Typography>
      </BannerHeader>
      {children || <Typography variant="body1">{message}</Typography>}
    </BannerContainer>
  );
};

export default Banner;
