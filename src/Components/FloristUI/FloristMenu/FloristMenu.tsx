import MenuCard from '../../UI/Layout/Card/CardMenu';
import { GlobalTheme } from '../../..';
import { ThemeProvider } from '@emotion/react';
import { Container, Grid, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const FloristMenu = () => {
    const colors = ['#04a96d', '#ef466f', 'purple', 'blue', '#da5a29'];
    const menuName = ['Цветы', 'Рецепты', 'Услуги', 'Игрушки', 'Фурнитура'];

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
            <Container sx={{ width: '60%', alignItems: 'flex-start', margin:0 }}>
                <Grid container>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="название" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Grid>

                <Grid container>
                    {menuName.map((name, index) => (
                        <Grid item sx={{ margin: 1 }}>
                            <MenuCard key={name} menuName={name} color={colors[index % colors.length]} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default FloristMenu;
