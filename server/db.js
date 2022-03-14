
let mysql=require('mysql');

// 创建连接池，效率更高，不需要每次操作数据库都创建连接
let pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'alphabet',
    port:3306,
    connectionLimit:50,//允许连接数
    multipleStatements : true,  //是否允许执行多条sql语句
    timezone:"08:00" //大坑，必须加这一句，否则时间不对劲
})

//封装数据库sql请求操作，返回的是一个包含对象的数组
let Query=( sql , ...params )=>{
     return new Promise(function(resolve,reject){
         //从连接池中拿一条链接
         pool.getConnection(function(err,connection){
            if(err){
                return reject(err);
            }
            connection.query( sql , params , function(error,res){
                // console.log(res);
                connection.release();
                if(error){
                    return  reject(error);
                }
                resolve(res);
            });
        });
    });
 };

//用户sql语句

    //登录验证
    let login=function(username,password){
        let sql=`
        select
            *
        from
            user
        where
            user.username='${username}' and  user.password='${password}'
        `;
        return sql;
    }
    //注册用户
    let regist=function(username,password){
        let sql=`
        insert into user (username,password) values('${username}','${password}')
        `;
        return sql;
    }
    let reguser=function(username){
        let sql=`
        select * from user where username='${username}'
        `;
        return sql;
    }
    //更改个人信息
    let changeInfo=function(params){
        //这个params里面装的是文字信息
        let sql;
        if (params.change === 'true') {
            sql=`
            update
                user
            set
                nickname='${params.nickname}',
                signature='${params.signature}',
                breif='${params.breif}',
                imgsrc='${params.imgsrc}',
                gender='${params.gender}'
            where
                username='${params.username}';
            `;
        }else{
            sql=`
            update
                user
            set
                nickname='${params.nickname}',
                signature='${params.signature}',
                breif='${params.breif}',
                gender='${params.gender}'
            where
                username='${params.username}';
            `;
        }
        return sql;   
    }

    //获取个人信息
    let  getInfo=function(username){
        let sql=`
        select
            nickname,
            imgsrc,
            signature,
            breif,
            gender
        from
            user where username='${username}'
        `;
        return sql;
    }

//前端sql语句

    //获取所有文章（完成）
    let allArticleFront=function(){
        let sql=`
        select
            *
        from
            article
        where
            article.state='发表'
        order by
            article.time desc ,article.id desc
        `;
        return sql;
    }

    // 获取一篇文章
    let oneArticleFront=function(id){
        let sql=`
        select
            *
        from
            article
        where
            article.id='${id}'
        `;

        return sql;
    }
    //获取前一篇文章
    let prePsgFront=function(id){
        let sql=`
        select
            id
        from
            article
        where
            id < ${id} and article.category=(select category from article where id=${id})
        order by 
            id desc
        limit
            1
        `;
        return sql;
    }

    let articleimg=function (id) {
        let sql=`
        select
            *
        from
            articleimg
        where
            articleid=${id}
        `
        return sql
    }

    //获取后一篇文章
    let nextPsgFront=function(id){
        let sql=`
        select
            id
        from
            article
        where
            id > ${id} and article.category=(select category from article where id=${id})
        limit
            1
        `;
        return sql;
    }

    //获取分类文章(完成)
    let categoryArticleFront=function(param){
        let sql=`
        select
            *
        from
            article 
        where 
            article.category='${param}' and article.state='发表'
        order by 
            article.time desc ,article.id desc
        `;
        return sql;
    }
    //获取归档文章信息(完成)
    let sortFileFront=function(){
        let sql=`
        select
            article.id,article.title,article.time
        from
            article
        where
            article.state='发表'
        order by
            article.time desc ,article.id desc
        `;
        return sql;
    }

    //获取所有标签
    let allTagsFront=function(){
        let sql=`
        select
            article.tags
        from
            article
        where
            article.state='发表'
        order by
            article.time desc ,article.id desc
        `;
        return sql;
    }

        
    //根据标签获取文章列表
    let tagPassagesFront=function(tag){
        let sql=`
        select
            article.id,article.title,article.time,article.category,article.tags,article.summary
        from
            article
        where
            article.state='发表' and article.tags like '%${tag}%'
        `;
        return sql;
    }

    //根据搜索关键词获取文章列表
    let searchPassageFront=function(str){
        let sql=`
        select
            article.id,article.title,article.time,article.category,article.tags,article.summary
        from
            article
        where
            article.state='发表' and (article.title like '%${str}%'  or article.summary like '%${str}%' or article.content like '%${str}%')
        `;
        return sql;
    }

    //发表评论
    let makeComment=function(comment){
        let sql=`
        insert into 
            comments (articleId,username,content,userimg) 
        values 
            (${comment.id},'${comment.username}','${comment.content}','${comment.userimg}');
        `;
        return sql;
    }
    //获取单篇文章的评论
    let getComments=function(id){
        let sql=`
        select
            *
        from
            comments
        where
            articleId=${id}
        order by
            comments.time desc
        `;
        return sql;
    }


// 后端sql语句
    //获取分类文章(完成)
    let queryCategory=function(param){
        let sql=`
        select
            *
        from
            article 
        where 
            article.category='${param}'
        order by 
            article.time desc ,article.id desc
        `;
        return sql;
    }

    //获取一篇文章(完成)
    let queryOneArticle=function(param){
        let sql= `
        select
            * 
        from
            article
        where
            article.id='${param}'
        `;
        return sql;
    };

    //更新文章
    let updateArticle=function(passage){
        let sql=`
        update
            article
        set
            title='${passage.title}',
            time='${passage.time}',
            category='${passage.category}',
            tags='${passage.tags}',
            state='${passage.state}',
            summary='${passage.summary}',
            content='${passage.content}'
        where
            id='${passage.id}';
        `;
        return sql;
    }

    //创建一篇文章
    let createArticle=function(passage){
        let sql=`
        insert into
            article (title,time,category,tags,state,summary,content)
        values
            ('${passage.title}','${passage.time}','${passage.category}','${passage.tags}','${passage.state}','${passage.summary}','${passage.content}');
        `;
        return sql;
    }

    // 更改文章状态
    let changeState=function(id,state){
        let sql=`
        update
            article
        set
            state='${state}'
        where
            id='${id}';
        `
        return sql;
    }
    // 删除文章
    let delArticle=function(id){
        let sql=`
        delete from
            article
        where
            id='${id}';
        `;
        return sql;
    }

    //获取所有文章的评论
    let getAllComments=function(){
        let sql=`
        select
            article.title,
            comments.*
        from
            comments left join article
        on
            comments.articleId=article.id
        order by
            comments.time desc;
        `;
        return sql;
    }

    //删除单条评论
    let delComment=function(id){
        let sql=`
        delete from
            comments
        where
            id='${id}';
        `;
        return sql;
    }

 module.exports={
    Query,

    queryCategory,
    queryOneArticle,
    updateArticle,
    createArticle,
    changeState,
    delArticle,
    changeInfo,
    getInfo,
    login,
    reguser,
    regist,
    articleimg,

    allArticleFront,
    oneArticleFront,
    prePsgFront,
    nextPsgFront,
    categoryArticleFront,
    sortFileFront,
    allTagsFront,
    tagPassagesFront,
    searchPassageFront,
    makeComment,
    getComments,
    getAllComments,
    delComment,

 }