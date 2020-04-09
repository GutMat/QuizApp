<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title text-center">{{question}}</h3>
        </div>
        <div class="panel-body">
            <div class="col-xs-12 col-sm-6 text-center">
                <button class="btn btn-primary btn-lg" style="margin: 10px">{{correct}}</button>
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
                <button class="btn btn-primary btn-lg" style="margin: 10px">{{incorrect[0]}}</button>
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
                <button class="btn btn-primary btn-lg" style="margin: 10px">{{incorrect[1]}}</button>
            </div>
            <div class="col-xs-12 col-sm-6 text-center">
                <button class="btn btn-primary btn-lg" style="margin: 10px">{{incorrect[2]}}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: 
        ['question', 'correct', 'incorrect']
    
}
</script>