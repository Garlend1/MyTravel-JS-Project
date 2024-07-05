import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }
  
  render() {
    if (this.state.error) {
      return (
        <>
          <h2>При отображении страницы произошла ошибка. </h2>
          <p>{this.state.error.message}</p>
        </>
      );
    } else {
      return this.props.children;
    }
  }
}
