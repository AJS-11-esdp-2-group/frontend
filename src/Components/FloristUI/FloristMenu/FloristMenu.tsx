import MenuCard from '../../UI/Layout/Card/CardMenu';
import { GlobalTheme } from '../../..';
import Items from '../../../Container/Items/Items';
import Recipes from '../../../Container/Recipes/Recipes';
import { ThemeProvider } from '@emotion/react';
import { Container, Grid, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const FloristMenu = () => {
    const [showItems, setShowItems] = useState(false);
    const [showRecipes, setShowRecipes] = useState(false);
    const colors = ['#04a96d', '#ef466f', '#f4a956'];
    const menuName = ['Товары', 'Рецепты', 'Услуги'];

    const handleFlowersClick = () => {
        setShowItems(!showItems);
        setShowRecipes(false);
    };

    const handleRecipesClick = () => {
        setShowItems(false);
        setShowRecipes(!showRecipes);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        right: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container sx={{ width: '60%', alignItems: 'flex-start', margin: 0 }}>
                <Grid container>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="название" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Grid>

                <Grid container>
                    <Grid item sx={{ margin: 1 }} onClick={handleFlowersClick}>
                        <MenuCard menuName={menuName[0]} color={colors[0]} />
                    </Grid>
                    <Grid item sx={{ margin: 1 }} onClick={handleRecipesClick}>
                        <MenuCard menuName={menuName[1]} color={colors[1]} />
                    </Grid>
                    {menuName.slice(2).map((name, index) => (
                        <Grid item sx={{ margin: 1 }} key={name}>
                            <MenuCard menuName={name} color={colors[(index + 2) % colors.length]} />
                        </Grid>
                    ))}
                </Grid>
                {showItems && <Items />}
                {showRecipes && <Recipes />}
            </Container>
        </ThemeProvider>
    );
};

export default FloristMenu;
