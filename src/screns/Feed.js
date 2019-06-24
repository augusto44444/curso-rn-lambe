import React, { Component } from "react";
import {
    View,
    FlatList,
    StyleSheet
} from "react-native";
import Header from '../components/header'
import Post from '../components/post'
import { connect } from 'react-redux'
import {fetchPosts} from '../store/actions/posts'

class Feed extends Component {
    componentDidMount = () => {
        this.props.onFetchPosts()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.props.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} />
                    }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    }
});

const mapStateToProps = ({posts}) => {
    return {posts: posts.posts}
}

const mapDispatchtoProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Feed);