// Globals
let loop;
let timer = 0;
const membrane_synth = new Tone.MembraneSynth().toMaster();
const synth = new Tone.Synth().toMaster();

// ========================================================

const play_synth = (note, accurate_time='now', velocity=1.0) => {
        const row = note;

        //                   1      2     3      4     5     6      7     8       9     10    11     12
        const row_to_key = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'E#4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', ];

        // TODO: Play at different durations
        const duration = '8n'; // eigth-note

        if (accurate_time === 'now')
            synth.triggerAttackRelease(row_to_key[row], duration);
        else
            synth.triggerAttackRelease(row_to_key[row], duration, accurate_time, velocity);
        
        console.log(`row: ${row}, key: ${row_to_key[row]}, at time: ${accurate_time}`);
};

class Piano_Roll_Instrument {

    

    // Fields
    name = 'Untitled Instrument';
    player = null;
    pattern = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    
    instrument_name_elem;

    constructor(name, instrument_num) {

        this.name = name;

        // const Player_Default = {
        //     onload:       Tone.noOp,
        //     playbackRate: 1,
        //     loop:         false,
        //     autostart:    false,
        //     loopStart:    0,
        //     loopEnd:      0,
        //     reverse:      false,
        //     fadeIn:       0,
        //     fadeOut:      0
        // }
        // this.player = new Tone.Player('./' + name).toMaster();

        const instrument_num_str = instrument_num.toString();
        this.instrument_name_elem = document.querySelector('#instrument-name-' + instrument_num);
        // this.instrument_name_elem.innerHTML = 'I-' + instrument_num_str;
        // this.instrument_name_elem.text = 'I-' + instrument_num_str;
        this.instrument_name_elem.value = 'I-' + instrument_num_str;

        // this.beats_elems = document.querySelectorAll('.Beats-' + instrument_num);
        this.beat_elems = document.querySelectorAll('.beats-' + instrument_num + ' .beat');

        // Initialize beat pattern on default instruments
        this.diagonal_notes();

        // Definitely not a pure function!
        const change_beat_color = (i) => {
            if (this.pattern[i]) 
                this.beat_elems[i].style.background = 'black';
            else 
                this.beat_elems[i].style.background = 'rgba(255, 154, 72)';

            const j = i;
            if(this.pattern[j])
            {
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.beat_elems[j].style.background = '#B2C2CC';
                else // red elements
                    this.beat_elems[j].style.background = '#DEB1B3';
            }
            else {
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.beat_elems[j].style.background = '#555A5E';
                else // red elements
                    this.beat_elems[j].style.background = '#655456';
            }


        };

        // Event-listener for drawing beat-pattern
        // this.beat_elems.forEach((val, i) => { // OLD UI
        this.beat_elems.forEach((val, i) => { // NEW UI

            // Set initial beat-pattern graphics
            change_beat_color(i);
            
            // Change color of beat graphic upon click
            //this.beat_elems[i].addEventListener('click', () => { // OLD UI
            this.beat_elems[i].addEventListener('click', () => { // NEW UI
                this.pattern[i] = !(this.pattern[i]);
                change_beat_color(i);
            });
        });
    } // constructor

    // TODO: Specify note
    note = 0;

    set() {
        // TODO: Make this not hard coded
        const row_length = 16;


        for (let i = 0; i < row_length; ++i) {
            this.pattern[0][i] = true;
        }
        console.log(this.pattern);
            
    }

    clear() {
        for (let pattern of this.pattern)
            pattern = false;
    }

    print() {
        for (let pattern of this.pattern)
            console.log(pattern);
    }

    one_and_three() {
        this.pattern[this.note][0] = true;
        this.pattern[this.note][8] = true;
    }

    two_and_four() {
        this.pattern[this.note][4] = true;
        this.pattern[this.note][12] = true;
    }

    funky_bass_drum() {
        this.pattern[this.note][0] = true;
        this.pattern[this.note][7] = true;
        this.pattern[this.note][9] = true;
        this.pattern[this.note][10] = true;
        this.pattern[this.note][13] = true;
    }

    diagonal_notes() {
        this.pattern[0][0] = true;
        this.pattern[1][1] = true;
        this.pattern[2][2] = true;
        this.pattern[3][3] = true;
        this.pattern[4][4] = true;
        this.pattern[5][5] = true;
        this.pattern[6][6] = true;
        this.pattern[7][7] = true;
        this.pattern[8][8] = true;
        this.pattern[9][9] = true;
        this.pattern[10][10] = true;
        this.pattern[11][11] = true;
        this.pattern[12][12] = true;
        this.pattern[13][13] = true;
        this.pattern[14][14] = true;
        this.pattern[15][15] = true;
    }
    
    get_notes_at_time(col) {

        // TODO: Un-Hard-Code!
        const num_notes = 16;
        
        const matrix_slice = new Array(num_notes);
        for(let row = 0; row < num_notes; row++) {

            if(this.pattern[row][col])
                matrix_slice[row] = true;
        }
        return matrix_slice;
    }
}

// ========================================================

// This currently only works with samples and not instruments with keys
class Instrument {

    // Fields
    name = 'Untitled Instrument';
    player = null;
    pattern = new Array(16);
    instrument_name_elem;

    constructor(name, instrument_num) {
        this.name = name;

        // const Player_Default = {
        //     onload:       Tone.noOp,
        //     playbackRate: 1,
        //     loop:         false,
        //     autostart:    false,
        //     loopStart:    0,
        //     loopEnd:      0,
        //     reverse:      false,
        //     fadeIn:       0,
        //     fadeOut:      0
        // }
        this.player = new Tone.Player('./' + name).toMaster();

        const instrument_num_str = instrument_num.toString();
        this.instrument_name_elem = document.querySelector('#instrument-name-' + instrument_num);
        // this.instrument_name_elem.innerHTML = 'I-' + instrument_num_str;
        // this.instrument_name_elem.text = 'I-' + instrument_num_str;
        this.instrument_name_elem.value = 'I-' + instrument_num_str;

        // this.beats_elems = document.querySelectorAll('.Beats-' + instrument_num);
        this.beat_elems = document.querySelectorAll('.beats-' + instrument_num + ' .beat');

        // Initialize beat pattern on default instruments
        switch (instrument_num) {
            case 0: this.set(); break;
            case 1: this.two_and_four(); break;
            case 2: this.funky_bass_drum(); break;
            default: this.clear();
        }

        // Definitely not a pure function!
        const change_beat_color = (i) => {
            if (this.pattern[i]) 
                this.beat_elems[i].style.background = 'black';
            else 
                this.beat_elems[i].style.background = 'rgba(255, 154, 72)';

            const j = i;
            if(this.pattern[j])
            {
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.beat_elems[j].style.background = '#B2C2CC';
                else // red elements
                    this.beat_elems[j].style.background = '#DEB1B3';
            }
            else {
                if ((0<=j && j<4) || (8<=j && j<12)) // gray elements
                    this.beat_elems[j].style.background = '#555A5E';
                else // red elements
                    this.beat_elems[j].style.background = '#655456';
            }


        };

        // Event-listener for drawing beat-pattern
        // this.beat_elems.forEach((val, i) => { // OLD UI
        this.beat_elems.forEach((val, i) => { // NEW UI

            // Set initial beat-pattern graphics
            change_beat_color(i);
            
            // Change color of beat graphic upon click
            //this.beat_elems[i].addEventListener('click', () => { // OLD UI
            this.beat_elems[i].addEventListener('click', () => { // NEW UI
                this.pattern[i] = !(this.pattern[i]);
                change_beat_color(i);
            });
        });

        // Create callback for load button
        const load_instrument_elem = document.querySelector('#load_' + instrument_num.toString());
        console.dir(load_instrument_elem);
        load_instrument_elem.addEventListener('change', () => {

            // Step 1: Get name
            const name = load_instrument_elem.files[0].name;

            // Step 2: Load into player via: new Tone.Player('./' + name).toMaster();
            // -Assumes in current directory
            this.change(name);

            // Step 3: Write name to Instrument-1 title
            this.instrument_name_elem.value = name.split('.')[0];
        });
    }

    // Methods
    change = name => this.player = new Tone.Player('./' + name).toMaster();

    set() {
        for (let i = 0; i < this.pattern.length; ++i)
            this.pattern[i] = true;
    }

    clear() {
        for (let pattern of this.pattern)
            pattern = false;
    }

    print() {
        for (let pattern of this.pattern)
            console.log(pattern);
    }

    one_and_three() {
        this.pattern[0] = true;
        this.pattern[8] = true;
    }

    two_and_four() {
        this.pattern[4] = true;
        this.pattern[12] = true;
    }

    funky_bass_drum() {
        this.pattern[0] = true;
        
        this.pattern[7] = true;
        this.pattern[9] = true;
        this.pattern[10] = true;
        this.pattern[13] = true;
    }
}

// ========================================================

class Channel_Rack {
    instruments = [new Instrument('../assets/hh_sample.mp3', 0), new Instrument('../assets/clap_sample.mp3', 1), new Instrument('../assets/bass_sample.mp3', 2)];

    piano_roll_instruments = [new Piano_Roll_Instrument('piano', 0)];
}
const channel_rack = new Channel_Rack();
// ========================================================

//attach a click listener to a play button
document.querySelector('#play_button').addEventListener('click', async () => {
    // -The await expression causes async function execution to pause until 
    //  a Promise is settled (that is, fulfilled or rejected), and to resume 
    //  execution of the async function after fulfillment.
    await Tone.start();
    console.log('audio is ready');

    // loopBeat = new Tone.Loop(callback, '4n');
    // loopBeat = new Tone.Loop(callback, '16n').start(0);
    // Tone.Transport.bpm.value = 180;
    // Tone.Transport.start();
    // loopBeat.start();


    const interval = '16n';
    loop = new Tone.Loop(callback, interval).start(0);

    const bpm_readout = document.querySelector('#bpm-readout');
    const bpm_slider_val = document.querySelector('#bpm-slider').value;
    bpm_readout.innerHTML = 'BPM: ' + bpm_slider_val;
    Tone.Transport.bpm.value = Number(bpm_slider_val);
    
    Tone.Transport.start();
})

const stop_button = document.getElementById('stop_button');
stop_button.addEventListener('click', () => {
    loop.stop();
});

const vol_slider = document.getElementById('volume');

let volume;
vol_slider.addEventListener('change', () => {
    volume = Number(vol_slider.value);
    console.log('volume = ' + volume + ', type: ' + typeof volume);
});

// ========================================================

function callback(time) {

    const BarsBeatsSixteenths = Tone.Transport.position;
    const Bars_Beats_Sixteenths = BarsBeatsSixteenths.split(':');
    // .position ↝ BarsBeatsSixteenths #
    // The Transport’s position in Bars:Beats:Sixteenths. Setting the value will jump to that position right away.
    //      BarsBeatsSixteenths
    //      A colon-separated representation of time in the form of Bars:Beats:Sixteenths.

    const bar = Number(Bars_Beats_Sixteenths[0]);
    const beat = Number(Bars_Beats_Sixteenths[1]);
    const sixteenth = Math.round(Number(Bars_Beats_Sixteenths[2]));

    const idx = (beat * 4) + sixteenth;

    document.querySelector('#bar').innerHTML = 'Bar: ' + bar;
    document.querySelector('#beat').innerHTML = 'Beat ' + beat;
    document.querySelector('#sixteenth').innerHTML = 'Sixteenth ' + sixteenth;

    document.querySelector('#index').innerHTML = 'Index: ' + idx;
    document.querySelector('#time').innerHTML = 'Time: ' + time;

    // Channel-Rack Metronome:
    const metronomes = document.querySelectorAll('.metronome-elem');
    metronomes[idx].style.background = 'yellow';
    if (idx > 0)
        metronomes[idx-1].style.background = 'black';
    else if (idx === 0 && timer > 0)
        metronomes[15].style.background = 'black';

    timer = (timer + 1);
    const idx_mod = idx % 16;
    if (channel_rack.instruments[0].pattern[idx_mod]) {
        channel_rack.instruments[0].player.start(time);
        channel_rack.instruments[0].player.stop(time + 0.5);
    }
    if (channel_rack.instruments[1].pattern[idx_mod]) {
        channel_rack.instruments[1].player.start(time);
        channel_rack.instruments[1].player.stop(time + 0.5);
    }
    if (channel_rack.instruments[2].pattern[idx_mod]) {
        channel_rack.instruments[2].player.start(time);
        channel_rack.instruments[2].player.stop(time + 0.5);
    }


}

