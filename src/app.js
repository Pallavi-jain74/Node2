// import express from 'express';
// let app=express();

// let todos=[
//     {
//         id:1,
//         task:"eating breakfast at 9pm",
//         completed:false
//     },
//     {
//         id:2,
//         task:"playing outdoors",
//         completed:false
//     },
//     {
//         id:3,
//         task:"sleep early by 10pm",
//         completed:false
//     },
// ];
// //middleware stack
// app.use(express.json());

// app.get("/todos",(req,res,next)=>{
//     if(!todos.length){
//         res.status(200).json({message:"No pending todos"});
//         return;
//     }

// res.status(200).json(todos);
// });


// app.post("/todos",(req,res,next)=>{
//     if(!req.body || !req.body.task){
//         req.status(200).json({message:"task is required"});
//         return;
//     }

//     let newTodo={
//         id:todos.length+1,
//         task:req.body.task,
//         completed:false,
//     };
//     todos.push(newTodo);
//     res.status(201).json(newTodo);
// });


// //dynamic url
// app.get("/todos/:id",(req,res,next)=>{
//     let todo=todos.find((obj)=>{
//         return obj.id === Number(req.params.id)
//     });
//     if(!todo){
//         res.status(200).json({message:"no todo with that id found!"});
//         return;
//     }
//     res.status(200).json(todo)
// });


// export default app;




import express from 'express';
let app=express();

let todos=[
    {
        id:1,
        task:"eating breakfast at 9pm",
        completed:false
    },
    {
        id:2,
        task:"playing outdoors",
        completed:true
    },
    {
        id:3,
        task:"sleep early by 10pm",
        completed:true
    },
];
//middleware stack
app.use(express.json());

app.get("/todos",(req,res,next)=>{
    if(!todos.length){
        res.status(200).json({message:"No pending todos"});
        return;
    }

    if(req.query.completed){
        let filteredTodos=todos.filter(todo=>{
            return todo.completed===Boolean(req.query.completed)//always queries implemented in get method
        })
        res.status(200).json(filteredTodos);
        return;
    }

res.status(200).json(todos);
});


app.post("/todos",(req,res,next)=>{
    if(!req.body || !req.body.task){
        req.status(200).json({message:"task is required"});
        return;
    }

    let newTodo={
        id:todos.length+1,
        task:req.body.task,
        completed:false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


//dynamic url
app.get("/todos/:id",(req,res,next)=>{
    let todo=todos.find((obj)=>{
        return obj.id === Number(req.params.id)
    });
    if(!todo){
        res.status(200).json({message:"no todo with that id found!"});
        return;
    }
    res.status(200).json(todo)
});


app.put("/todos/:id",(req,res,next)=>{
    let todoIndex=todos.findIndex((todo)=>{
        return todo.id === Number(req.params.id)
    }); 
    if(todoIndex<0){
        res.status(200).json({message:"no todo with that id found!"});
        return;
    }
    todos[todoIndex].task=req.body.task
    res.status(200).json(todos[todoIndex])
})


app.put("/todos/status/:id",(req,res,next)=>{
    let todoIndex=todos.findIndex((todo)=>{
        return todo.id === Number(req.params.id)
    }); 
    if(todoIndex<0){
        res.status(200).json({message:"no todo with that id found!"});
        return;
    }
    todos[todoIndex].completed=Boolean(req.body.completed)
    res.status(200).json(todos[todoIndex])
})


app.delete("/todos/:id",(req,res,next)=>{
    let todoIndex=todos.findIndex((todo)=>{
        return todo.id === Number(req.params.id)
    }); 
    if(todoIndex<0){
        res.status(200).json({message:"no todo with that id found!"});
        return;
    }
    todos.splice(todoIndex,1)
    res.status(200).json({message:"Deleted successfully"})
})


export default app;