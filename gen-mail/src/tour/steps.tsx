import React from 'react';
import styled from "@emotion/styled"

export const steps = [
    {
        selector: '.intro-step',
        content: () => (
            <StyledIntro>
                Welcome to GenPlate.
            </StyledIntro>
        )
    },
    {
        selector: '.first-step',
        content: "This is the first step.",
    }, 
    {
        selector: '.second-step',
        content: "This is the second step.",
    },
    {
        selector: '.third-step',
        content: "This is the third step.",
    },
    {
        selector: '.fourth-step',
        content: "This is the fourth step.",
    },
    {
        selector: '.fifth-step',
        content: "This is the fifth step.",
    }
]

const StyledIntro = styled("div")`
    /* margin: 200px 200px; */
`