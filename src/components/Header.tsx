import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export function Header () {
    return (
        <>
            <Navbar sticky='top' className='bg-white' style={{borderBottom: '1px solid var(--light-grey)'}}>
                <Container>
                <h1 style={{color: 'var(--primary)'}}>REPS</h1>

                <Nav className='me-auto'>
                    {/* <NavLink to='/splits' activeClassName="underline" > */}
                        Splits
                    {/* </NavLink> */}
                </Nav>


                </Container>
            </Navbar>
        </>
    )
}