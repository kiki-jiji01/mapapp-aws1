// import React from 'react';
// import styled from "styled-components"


// class Searchbar extends React.Component {
//     handleChange = (event) => {
//         this.setState({
//             term: event.target.value
//         });
    
//     };
//     handleSubmit = event => {
//         event.preventDefault();
//         this.props.handleFormSubmit(this.state.term);
//     }

//     render() {
        
//         return (
            
        
//             <TopSearchWrapper>
//                 <form onSubmit={this.handleSubmit} className='ui form'>
//                     <div className='field'>
//                         <input onChange={this.handleChange} name='video-search' type="text" placeholder="Search.."/>
//                     </div>
//                 </form>
//             </TopSearchWrapper>
                
//         )
//     }
// }
// export default Searchbar;


// const TopSearchWrapper = styled.div`
// top:10vh;
// position: relative;

// `