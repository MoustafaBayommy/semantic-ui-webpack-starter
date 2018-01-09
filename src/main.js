import 'semantic-ui-less/semantic.less';

const content = `
    <div class="ui container" style="margin-top: 1rem;">
        <h1>Semantic UI Webpack Starter</h1>
        <div class="ui segment">
            <h2>Text</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam totam sint praesentium blanditiis iure magnam nulla rem
                possimus iste sapiente, esse ut similique aperiam quae, non officiis inventore earum error.
            </p>
        </div>
        <div class="ui segment">
            <h2>Colors</h2>
            <div class="ui columns stackable padded grid">
                <div class="red column">Red</div>
                <div class="orange column">Orange</div>
                <div class="yellow column">Yellow</div>
                <div class="olive column">Olive</div>
                <div class="green column">Green</div>
                <div class="teal column">Teal</div>
                <div class="blue column">Blue</div>
                <div class="violet column">Violet</div>
                <div class="purple column">Purple</div>
                <div class="pink column">Pink</div>
                <div class="brown column">Brown</div>
                <div class="grey column">Grey</div>
                <div class="black column">Black</div>
            </div>
        </div>
        <div class="ui segment">
            <h2>Buttons</h2>
            <div class="ui button">Regular</div>
            <div class="ui primary button">Primary</div>
            <div class="ui positive button">Positive</div>
            <div class="ui negative button">Negative</div>
        </div>
    </div>
`;

const app = document.getElementById('app');
app.innerHTML = content;
