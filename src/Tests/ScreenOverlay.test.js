import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScreenOverlay from '../ScreenOverlay';

test('ScreenOverlay will not display children when displayOverlay is false', () => {
    let headerContent = 'testHeader'
    render(
    <ScreenOverlay displayOverlay={false}>
        <div>
            <h1>{headerContent}</h1> 
        </div>
    </ScreenOverlay>)
    expect(screen.queryByRole('heading', {name: headerContent})).toBeNull();
})

test('ScreenOverlay will display children when displayOverlay is true', () => {
    let headerContent = 'testHeader'
    render(
    <ScreenOverlay displayOverlay={true}>
        <div>
            <h1>{headerContent}</h1> 
        </div>
    </ScreenOverlay>)
    expect(screen.getByRole('heading', {name: headerContent})).toBeTruthy();
})

test('clicking the overlay will call this.props.hideOverlay', () => {
    let componentContents = 'testText'
    let hiderOverlayCalled = false;
    let propsHideOverlay = function(){
        hiderOverlayCalled = true;
    }
    render(
    <ScreenOverlay displayOverlay={true} hideOverlay ={propsHideOverlay}>
        {componentContents}
    </ScreenOverlay>)
    expect(hiderOverlayCalled).not.toBeTruthy();
    userEvent.click(screen.getByText(componentContents))
    expect(hiderOverlayCalled).toBeTruthy();
})