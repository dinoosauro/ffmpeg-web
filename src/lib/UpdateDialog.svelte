<script>
    import { updateDialogShown } from "../ts/Writables";
    import AdaptiveAsset from "./UIElements/AdaptiveAsset.svelte";
    import Card from "./UIElements/Card/Card.svelte";
    import Dialog from "./UIElements/Dialog.svelte";
</script>

<Dialog closeFunction={() => updateDialogShown.set(false)} closeAtTop={true}>
    <h2>What's new in ffmpeg-web</h2>
    <div class="flex hcenter wcenter">
        <AdaptiveAsset asset="icon" width={128}></AdaptiveAsset>
    </div>
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.2.0</h3>
        <Card forceColor={true}>
            <ul>
                <li>Added new "Image to video" section
                    <ul>
                        <li>It's now possible to merge multiple images into a single video</li>
                        <li>The user can choose the duration of each image, and the transition between them</li>
                    </ul>
                </li>
                <li>Fixed a bug that didn't permit to move a file to an external drive while using the Electron version</li>
                <li>Improved styling in certain areas</li>
            </ul>
        </Card>
    </Card><br>
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.6</h3>
        <Card forceColor={true}>
            <ul>
                <li>Improved multiple timestamps support
                    <ul>
                        <li>By default, multiple timestamp trimming is now way faster, especially when files are re-encoded</li>
                        <li>Improved logic behind the timestamp/title division so that it fails less times</li>
                        <li>Other bug fixes in the multiple timestamp support</li>
                    </ul>
                </li>
                <li>Improved zip file download
                    <ul>
                        <li>Zip.JS can now also be used for normal downloads, without using Streams</li>
                        <li>Improved the reliability of zip file download using the Service Worker</li>
                    </ul>
                </li>
                <li>Improved settings saving
                    <ul>
                        <li>Settings are now saved every time they're changed, while before they were saved only when the user closed the page (and mobile browser didn't trigger that event)</li>
                    </ul>
                </li>
                <li>Other bug fixes</li>
            </ul>
        </Card>
    </Card><br>
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.5</h3>
        <Card forceColor={true}>
            <ul>
                <li>Added Simplified Chinese support.
                    <ul>
                        <li>Thanks to <a href="https://github.com/God-2077" target="_blank">God-2077</a> for the translation!</li>
                    </ul>
                </li>
            </ul>
        </Card>
    </Card><br>
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.4</h3>
        <Card forceColor={true}>
            <ul>
                <li>
                    The zip files from Zip.JS are now saved as a stream. This
                    should help using less RAM, and it also brings a more native
                    experience on Chromium-based browsers.
                </li>
                <li>
                    It's now possible to use AudioToolbox on macOS for AAC and
                    ALAC encoding. This opt-in feature requires native FFmpeg
                    and the Electron client.
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.3</h3>
        <Card forceColor={true}>
            <ul>
                <li>
                    You can now use Zip.JS instead of JSZIP for zip encoding.
                    This should solve some issues that might arise from
                    converting many files (or heavy ones) and adding them to a
                    zip file using the JSZIP library.
                    <ul>
                        <li>
                            You still can use the JSZIP library, that will
                            probably work fine in 99% of cases.
                        </li>
                    </ul>
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.2</h3>
        <Card forceColor={true}>
            <ul>
                <li>
                    WORKERFS is now supported on FFmpeg.Wasm 0.12.x for file
                    reading. This greatly helps reducing RAM usage
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.1</h3>
        <Card forceColor={true}>
            <ul>
                <li>
                    It's now possible to choose a custom file extension in the
                    "Media encoding" section
                </li>
                <li>
                    Fixed a bug due to which images/videos that should have been
                    displayed in the screensaver weren't saved
                </li>
                <li>
                    Fixed the wrong address of the website icon in the
                    manifest.json file (see <a
                        href="https://github.com/dinoosauro/ffmpeg-web/pull/13"
                        target="_blank">#13 by @birabittoh</a
                    >)
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.1.0</h3>
        <Card forceColor={true}>
            <ul>
                <li>Added the new «Audio to video» mode</li>
                <ul>
                    <li>
                        Create a video that shows the album art of an audio file
                    </li>
                    <li>
                        It's possible to display also the essential metadata
                        (title, artist, album) and/or every metadata fetched by
                        FFmpeg
                    </li>
                    <li>A custom album art can be provided for the video</li>
                </ul>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.0.6</h3>
        <Card forceColor={true}>
            <ul>
                <li>Added support for VAAPI in the Electron version</li>
                <li>
                    Fixed a bug where arguments before the input argument
                    wouldn't be added in the command
                </li>
                <li>
                    Added option to encode with AV1. It might work only on the
                    Electron version
                </li>
                <li>
                    The user can now change the maxrate, in case they use
                    hardware acceleration
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.0.5</h3>
        <Card forceColor={true}>
            <ul>
                <li>Improved console message handling</li>
                <li>WakeLock is now requested when screensaver is enabled</li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.0.4</h3>
        <Card forceColor={true}>
            <ul>
                <li>
                    It's now possible to add multiple images or video as
                    background
                </li>
                <li>
                    On supported browsers, a YouTube embed can be used as the
                    background/screensaver content
                </li>
                <li>
                    Added keyboard shortcuts: press <code>Esc</code> to close a
                    dialog, and press <code>Ctrl/Cmd + P</code> to open Settings
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.0.3</h3>
        <i
            >Versions 3.0.1 was only bug fixes, while 3.0.2 only introduced
            moving screensaver</i
        ><br /><br />
        <Card forceColor={true}>
            <ul>
                <li>
                    Fixed lots of bugs (you can find the complete list on
                    GitHub)
                </li>
                <li>
                    You can now use one of the criterias for file picking also
                    for custom input files
                </li>
                <li>
                    Filter multiple file extensions by dividing them with "|" in
                    the textbox
                </li>
                <li>
                    Added an "Installation" tab, where the user can see how to
                    install ffmpeg-web
                </li>
            </ul>
        </Card>
    </Card><br />
    <Card type={1} forceColor={true}>
        <h3 style="text-align: center;">Version 3.0.0:</h3>
        <Card forceColor={true}>
            <h4>Introduction:</h4>
            <p>
                Welcome in the biggest update of ffmpeg-web! The source code has
                been completely rewritten to provide a faster and more modular
                experience. Most of your settings have been automatically
                migrated to the new version, but it might be a great idea to
                check them.<br />
                <strong
                    >If you don't care, you can find the "Close dialog" button
                    by scrolling below</strong
                >
            </p>
        </Card><br />
        <Card forceColor={true}>
            <h4>What's new:</h4>
            <ul>
                <li>
                    <strong>Support for ffmpeg.wasm 0.12:</strong> finally, you can
                    use the next version of FFmpeg WebAssembly, and this can be really
                    useful if you plan to use ffmpeg-web singlethreaded. It's still
                    suggested using the 0.11.x version of ffmpeg.wasm, since it supports
                    more codecs.
                </li>
                <li>
                    <strong>Multiple conversions:</strong> you can now run multiple
                    FFmpeg processes at the same time, and you can choose from a
                    Select the conversion you want to follow.
                </li>
                <li>
                    <strong>Screensaver:</strong> if you plan to use ffmpeg-web for
                    long conversions, you can now set a screensaver. You can choose
                    its background and the information to display there.
                </li>
                <li>
                    <strong>More customization options:</strong>
                    <ul>
                        <li>Add opacity to custom themes</li>
                        <li>
                            Use a background image, video or YouTube embed
                            instead of the background color
                        </li>
                        <li>Add blur effects</li>
                    </ul>
                </li>
                <li>
                    <strong>Improved animations:</strong> while there's still room
                    for improvement, I think the new animations are better than the
                    previous ones (thanks to Svelte)
                </li>
                <li>
                    <strong>File System API support:</strong> on Chromium-based browsers,
                    you can now save files directly on your device using the File
                    System API.
                </li>
            </ul>
        </Card><br />
        <Card forceColor={true}>
            <h4>Removed features:</h4>
            <ul>
                <li>
                    <strong>Add multiple conversions to the same zip:</strong> you
                    can still save the output files in a .zip file, but it'll be
                    downloaded at the end of each operation.
                </li>
                <li>
                    <strong>Maximum characters displayed in the console:</strong
                    > the script will automatically manage the number of lines that
                    will be displayed.
                </li>
            </ul>
        </Card><br />
        <Card forceColor={true}>
            <h4>Feedback:</h4>
            <p>
                Let me know what you think! If you need help, feel free to open
                an issue on <a
                    href="https://github.com/Dinoosauro/ffmpeg-web"
                    target="_blank">ffmpeg-web's GitHub page.</a
                >
            </p>
        </Card>
    </Card>
</Dialog>
